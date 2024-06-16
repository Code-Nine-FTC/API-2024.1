import { IFuncionarioInput, IFuncionarioUpdate, IFuncionarioLoggin } from "../interfaces/IFuncionario";
import Funcionario from "../entities/funcionario";
import { Connection } from "../config/data-source";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export class FuncionarioService {
    private funcionarioRepository = Connection.getRepository(Funcionario)

    public async cadastrarFuncionario(dadosFuncionario: IFuncionarioInput) {
        try {
            const funcionarioExistente = await this.funcionarioRepository.findOne({
                where: [
                    { func_cpf: dadosFuncionario.func_cpf },
                    { func_email: dadosFuncionario.func_email }
                ]
            });
            if (funcionarioExistente) {
                return { success: false, message: "Funcionario já registrado." };
            }
            const cpfValidado = this.validarCpf(dadosFuncionario.func_cpf)
            if (!cpfValidado) {
                return { success: false, message: `CPF inválido` }
            }
            // Criptografia
            const senhaCriptografada = await bcrypt.hash(dadosFuncionario.func_senha, 10);
            dadosFuncionario.func_senha = senhaCriptografada
            // criando novo usuario
            const novoFuncionario = this.funcionarioRepository.create(dadosFuncionario);
            await this.funcionarioRepository.save(novoFuncionario);

            return { success: true, message: "Funcionário cadastrado com sucesso" }
        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
            return { success: false, message: "Erro ao cadastrar funcionário!" };
        }
    }

    public async loginFuncionario(dadosLoggin: IFuncionarioLoggin) {
        try {
            // Senhas para criação de token
            const secret2 = process.env.SECRET02
            const secret3 = process.env.SECRET03
            // busca funcionario
            const funcionario = await this.funcionarioRepository.findOne({ where: { func_cpf: dadosLoggin.func_cpf } });
            // verifica se o funcionario existe
            if (!funcionario) {
                console.log('Funcionário não encontrado')
                return { success: false, message: 'Funcionário não encontrado!' };
            }
            // Verifica se o funcionario está ativo
            if (!funcionario.ativo) {
                return { success: false, message: 'Entrada negada' };
            }
            // Funcionario comum
            if (!funcionario.func_is_admin) {
                // verificação de senha do usuario
                if (!bcrypt.compareSync(dadosLoggin.func_senha, funcionario.func_senha)) {
                    return { success: false, message: 'Dados inválidos!' };
                }
                // criação de token após confirmação de senha
                const token = jwt.sign({ id: funcionario.func_id }, secret2)
                return { success: true, message: 'Autenticação realizada com sucesso.', funcionario, token, nivelAcesso: 'atendente' };
            }
            // Admin
            // Verifica senha
            if (!bcrypt.compareSync(dadosLoggin.func_senha, funcionario.func_senha)) {
                return { success: false, message: 'Dados inválidos!' };
            }
            // Cria token após fazer login
            const token = jwt.sign({ id: funcionario.func_id }, secret3)
            return { success: true, message: 'Autenticação realizada com sucesso', funcionario, token, nivelAcesso: 'administrador' };
        } catch (error) {
            console.error(`Erro ao fazer login: ${error}`);
            return { success: false, message: 'Erro ao fazer login!' };
        }
    }

    public async editarFuncionario(id: number, dadosUpdate: IFuncionarioUpdate) {
        try {
            // busca funcionario
            const funcionario = await this.funcionarioRepository.findOne({ where: { func_id: id } })
            // verifica se ele existe
            if (!funcionario) {
                return { success: false, message: `Funcionário não encontrado!` }
            }
            // verifica se nos dadosupdate veio o cpf
            if (dadosUpdate.func_cpf) {
                // valida cpf
                const cpfValidado = this.validarCpf(dadosUpdate.func_cpf)
                // verifca se o cpf é valido
                if (!cpfValidado) {
                    return { success: false, message: `CPF inválido` }
                }
                // busca o cpf 
                const cpfExistente = await this.funcionarioRepository.findOne({ where: { func_cpf: dadosUpdate.func_cpf } })
                // verifica se ele existe
                if (cpfExistente && cpfExistente.func_id !== id) {
                    return { success: false, message: `CPF já registrado` }
                }
            }
            // verifica se nos dadosUpdate tem email
            if (dadosUpdate.func_email) {
                // busca email
                const emailExistente = await this.funcionarioRepository.findOne({ where: { func_email: dadosUpdate.func_email } })
                // verifica se o email já existe 
                if (emailExistente && emailExistente.func_id !== id) {
                    return { success: false, message: `E-mail já cadastrado` };
                }
            }
            // verifica se nos dadosUpdate tem senha
            if (dadosUpdate.func_senha) {
                // criptografa senha 
                const senhaCriptografada = await bcrypt.hash(dadosUpdate.func_senha, 10);
                dadosUpdate.func_senha = senhaCriptografada;
            }
            // Mesclando os dados
            const funcionarioUpdate = { ...funcionario, ...dadosUpdate }
            delete funcionarioUpdate.func_id;
            // atualizando os dados do funcionario
            await this.funcionarioRepository.update(id, funcionarioUpdate)
            return { success: true, message: `Funcionário atualizado com sucesso!`, funcionarioUpdate }
        } catch (error) {
            console.error(`Erro ao editar funcionário: ${error}`)
            return { success: false, message: `Erro ao editar funcionário!` }
        }
    }

    public async visualizarFuncionario(id: number) {
        try {
            // Busca funcionario
            const funcionario = await this.funcionarioRepository.findOne({ where: { func_id: id } })
            // Verifica se o funcionario existe
            if (!funcionario) {
                return { success: false, message: `Funcionário não encontrado!` }
            }
            return { success: true, message: 'Funcionário encontrado!', funcionario }
        } catch (error) {
            console.error(`Erro ao encontrar funcionário: ${error}`)
            return { success: false, message: `Erro ao encontrar o funcionário!` }
        }
    }

    public async visualizarTodosFuncionarios() {
        try {
            // Busca os funcinarios
            const funcionarios = await this.funcionarioRepository.find({
                where : { func_is_admin : false }
            })
            // Verifica se existe funcionarios registrados
            if (!funcionarios || funcionarios.length === 0) {
                return { success: false, message: `Nenhum funcionário encontrado!` }
            }
            return { success: true, message: 'Funcionários encontrados!', funcionarios }
        } catch (error) {
            console.error(`Erro ao encontrar funcionários: ${error}`)
            return { success: false, message: `Erro ao encontrar os funcionários!` }
        }
    }

    public async desativarFuncionario(id: number) {
        try {
            // Busca funcionarios
            const funcionario = await this.funcionarioRepository.findOne({ where: { func_id: id } })
            // Verifica se o funcionario existe
            if (!funcionario) {
                return { success: false, message: `Funcionario não entrado.` }
            }
            //Desativa o funcionario
            funcionario.ativo = false
            // Atualiza  
            await this.funcionarioRepository.update(id,funcionario)
            return { success: true, message: `Funcionario desativado com sucesso`, funcionario }
        } catch (error) {
            console.error(`Erro ao encontrar funcionario: ${error}`)
            return { success: false, message: `Erro ao encontrar o funcionario` }
        }
    }

    private validarCpf(cpf: string): boolean {
        if (cpf.length !== 11) {
            return false
        }
        // Verifica se todos os numeros são iguais
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false
        }
        // Calculando o primeiro digito verificador cpf[10]
        let soma = 0
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i)
        }
        let resto = soma % 11
        let digitoVerificador1: number
        if (resto < 2) {
            digitoVerificador1 = 0
        } else {
            digitoVerificador1 = 11 - resto
        }
        // Verifica se o primeiro digito verificador é diferente do que foi calulado
        if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
            return false
        }
        // Calcula o segundo digito vereficador
        soma = 0
        resto = 0
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i)
        }
        resto = soma % 11
        let digitoVerificador2: number
        if (resto < 2) {
            digitoVerificador2 = 0
        } else {
            digitoVerificador2 = 11 - resto
        }
        // Verifica se o segundo digito verificador é diferente do que foi calculado 
        if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
            return false
        }
        // CPF Valido
        return true
    }

}