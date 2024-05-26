import { IClienteInput, IClienteLoggin, IClienteUpdate } from "../interfaces/ICliente";
import Cliente from "../entities/cliente";
import { Connection } from "../config/data-source";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import ChamadoService from "./chamadoService";

export class ClienteService {
    private clienteRepository = Connection.getRepository(Cliente)

    // Cria novo cliente
    public async cadastrarCliente(dadosCliente: IClienteInput) {
        try {
            // Procura se o e-mail ou o cpf já são cadastrados
            const cliente = await this.clienteRepository.findOne({
                where: [
                    { cli_email: dadosCliente.cli_email },
                    { cli_cpf: dadosCliente.cli_cpf },
                ]
            })
            //verifica se o cliente existe e ta desativado
            if (cliente && !cliente.ativo ) {
                const senhaCriptografada = await bcrypt.hash(dadosCliente.cli_senha, 10); 
                const novosDadosCliente = {
                    cli_senha: senhaCriptografada,
                    cli_nome: dadosCliente.cli_nome, 
                    ativo: true 
                };
                await this.clienteRepository.update(cliente.cli_id, novosDadosCliente);
                return { success: true, message: `Cliente ativado com sucesso` };
            }
            // verifica se ele existe
            if (cliente) {
                return { success: false, message: `Usuario já cadastrado` }
            }
            // Validação de CPF
            const cpfValidado = this.validarCpf(dadosCliente.cli_cpf)
            if (!cpfValidado) {
                console.log('CPF invalido')
                return { success: false, message: `CPF inválido` }
            }
            // Criptografia de Senha
            const senhaCriptografada = await bcrypt.hash(dadosCliente.cli_senha, 10)
            dadosCliente.cli_senha = senhaCriptografada
            // Criando novo usario
            const novoCliente = await this.clienteRepository.create(dadosCliente)
            // Salvando novo cliente
            await this.clienteRepository.save(novoCliente)
            return { success: true, message: `Cliente cadastrado com sucesso` }



        } catch (error) {
            console.error(`Erro ao cadastrar cliente:`, error)
            return { success: false, message: `Erro ao cadastrar cliente` }
        }
    }

    // Login do cliente
    public async logginCliente(dadosLogin: IClienteLoggin) {
        try {
            // Senha para token
            const secret = process.env.SECRET
            // busca cliente com os dados recebidos
            const cliente = await this.clienteRepository.findOne({ where: { cli_email: dadosLogin.cli_email } })
            // verifica se ele existe
            if (!cliente) {
                return { success: false, message: `Cliente não encontrado` }
            }
            if (cliente.ativo === false) {
                return { success: false, message: `Cliente Desativado` }
            }
            // verifica senha
            if (!bcrypt.compareSync(dadosLogin.cli_senha, cliente.cli_senha)) {
                return { success: false, message: `Dados invalidos` }
            }
            // cria token  após informações ok
            const token = jwt.sign({ id: cliente.cli_id, nivelAcesso: 'usuario' }, secret)

            return { success: true, message: `Autenticação realizada com sucesso`, token, nivelAcesso: 'usuario' }

        } catch (error) {
            console.error(`Erro ao logar cliente: ${error}`)
            return { success: false, message: `Erro ao logar cliente` }
        }
    }

    // Editar cliente
    public async editarCliente(id: number, dadosUpdate: IClienteUpdate) {
        try {
            // busca cliente
            const cliente = await this.clienteRepository.findOne({ where: { cli_id: id } })

            // verifica se ele existe
            if (!cliente) {
                return { success: false, message: `Cliente não encontrado` }
            }

            // verificações 
            if (dadosUpdate.cli_cpf) {

                const cpfValidado = this.validarCpf(dadosUpdate.cli_cpf)

                if (cpfValidado) {

                    const cpfExistente = await this.clienteRepository.findOne({ where: { cli_cpf: dadosUpdate.cli_cpf } })

                    if (cpfExistente && cpfExistente.cli_id !== id) {
                        return { success: false, message: `CPF já cadastrado` }
                    }
                } else {
                    return { success: false, message: `CPF inválido` }
                }
            }

            if (dadosUpdate.cli_email) {
                const emailExistente = await this.clienteRepository.findOne({ where: { cli_email: dadosUpdate.cli_email } })

                if (emailExistente && emailExistente.cli_id !== id) {
                    return { success: false, message: `E-mail já cadastrado` }
                }
            }

            if (dadosUpdate.cli_senha) {
                const senhaCriptografada = await bcrypt.hash(dadosUpdate.cli_senha, 10)
                dadosUpdate.cli_senha = senhaCriptografada
            }
            // salva de acordo com o que foi alteirado
            const clienteUpdate = { ...cliente, ...dadosUpdate }
            await this.clienteRepository.update(id, clienteUpdate)
            return { success: true, message: `Cliente atualizado com sucesso`, clienteUpdate }
        } catch (error) {
            console.error(`Erro ao editar cliente: ${error}`)
            return { success: false, message: `Erro ao editar cliente` }
        }
    }

    // ver cliente
    public async visualizarCliente(id: number) {
        try {
            // busca cliente
            const cliente = await this.clienteRepository.findOne({ where: { cli_id: id } })
            // verifica se ele existe
            if (!cliente) {
                return { success: false, message: `Cliente não encontrado` }
            }
            return { success: true, message: `Cliente encontrado`, cliente }
        } catch (error) {
            console.error(`Erro ao encontrar cliente: ${error}`)
            return { success: false, message: `Erro ao encontrar o cliente` }
        }
    }

    // desativa cliente
    public async desativarCliente(id: number, chamadoService: ChamadoService) {
        try {
            // busca cliente
            const cliente = await this.clienteRepository.findOne({ where: { cli_id: id } })
            // verifica se ele existe
            if (!cliente) {
                return { success: false, message: `Cliente não encontrado` };
            }
            // muda para desativado
            cliente.ativo = false;
            // dalva as informações
            await this.clienteRepository.save(cliente);
            // chama cancelar chamado do chamado service
            await chamadoService.cancelarChamado(id);

            return { success: true, message: `Cliente desativado com sucesso` };
        } catch (error) {
            console.error(`Erro ao desativar cliente: ${error}`);
            return { success: false, message: `Erro ao desativar cliente` };
        }
    }

    // validação de cpf
    private validarCpf(cpf: string): boolean {
        if (!cpf) {
            console.log('Deu erro na verificação do CPF')
            console.log(cpf)
            return false
        }
        // console.log(cpf)
        // Remove todos os elementos que não seja númerico
        // Verifica se o cpf tem tamanho igual a 11
        if (cpf.length !== 11) {
            console.log('Deu erro no length')
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
        console.log('CPF Validado')
        return true
    }
}