import { IFuncionarioInput, IFuncionarioUpdate, IFuncionarioLoggin } from "../interfaces/IFuncionario";
import Funcionario from "../entities/funcionario";
import { Connection } from "../config/data-source";
import * as bcrypt from 'bcrypt';

export class FuncionarioService {
    public async cadastrarFuncionario(dadosFuncionario: IFuncionarioInput):Promise<{ success: boolean, message: string, funcionario?: Funcionario[]}> {
        const funcionarioRepository = Connection.getRepository(Funcionario);
        try {
            console.log('Recebendo dados no clienteService')
            console.log(dadosFuncionario)
            const funcionarioExistente = await funcionarioRepository.findOne({where: [
                {func_cpf: dadosFuncionario.func_cpf},
                {func_email: dadosFuncionario.func_email}
            ]
        });
           if (!funcionarioExistente){
                const cpfValidado = this.validarCpf(dadosFuncionario.func_cpf)
                if (!cpfValidado){
                    console.log('CPF invalido')
                    return { success: false, message: `CPF inválido`}
                }
                // Criptografia
                const senhaCriptografada =await bcrypt.hash(dadosFuncionario.func_senha, 10);
                dadosFuncionario.func_senha = senhaCriptografada
                const novoFuncionario = funcionarioRepository.create(dadosFuncionario);
                await funcionarioRepository.save(novoFuncionario);
                return { success: true, message: "Funcionário cadastrado com sucesso"};
            } return { success: false, message: "CPF já cadastrado." };
        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
            return { success: false, message: "Erro ao cadastrar funcionário!" };
        }
    }
    public async logginFuncionario(dadosLoggin: IFuncionarioLoggin) {
        try {
            const funcionarioRepository = Connection.getRepository(Funcionario);
            const funcionario = await funcionarioRepository.findOne({ where: { func_cpf: dadosLoggin.func_cpf } });
            if (!funcionario) { 
                return { success: false, message: 'Funcionário não encontrado!' };
            } 
            // Verifica se o funcionario está ativo
            if(!funcionario.ativo){
                return { success: false, message: 'Entrada negada' };
            }
            // Funcionario
            if (!funcionario.func_is_admin){
                if (!bcrypt.compareSync(dadosLoggin.func_senha, funcionario.func_senha)) {
                    return { success: false, message: 'Dados inválidos!' };
                }
                return { success: true, message: 'Login bem sucedido!', funcionario };
            }
            // Admin
            if (!bcrypt.compareSync(dadosLoggin.func_senha, funcionario.func_senha)){
                return { success: false, message: 'Dados inválidos!' };
            }
            return { success: true, message: 'Login bem sucedido!', funcionario };
        } catch (error) {
            console.error(`Erro ao fazer login: ${error}`);
            return { success: false, message: 'Erro ao fazer login!' };
        }
    }
    public async editarFuncionario(id: number, dadosUpdate: IFuncionarioUpdate){
        try{
            const funcionarioRepository = Connection.getRepository(Funcionario)
            const funcionario = await funcionarioRepository.findOne({ where: { func_id:id }})
            if (!funcionario){
                return { success: false, message: `Funcionário não encontrado!`}
            }
            if (dadosUpdate.func_cpf){
                const cpfValidado = this.validarCpf(dadosUpdate.func_cpf)
                if(cpfValidado){
                    const cpfExistente = await funcionarioRepository.findOne({where : {func_cpf: dadosUpdate.func_cpf}})
                    if (cpfExistente && cpfExistente.func_id !== id){
                        return { success: false, message: `CPF já registrado`}
                    }
                }else{
                    return { success: false, message: `CPF inválido`}
                }
            }
            if (dadosUpdate.func_email){
                const emailExistente = await funcionarioRepository.findOne({where: {func_email: dadosUpdate.func_cpf}})
                if(emailExistente && emailExistente.func_id !== id){
                    return { success: false, message: `E-mail já cadastrado` };
                }
            }
            if (dadosUpdate.func_senha) {
                const senhaCriptografada = await bcrypt.hash(dadosUpdate.func_senha, 10);
                dadosUpdate.func_senha = senhaCriptografada;
            }
            const funcionarioUpdate = {...funcionario, ...dadosUpdate}
            await funcionarioRepository.update(id, funcionarioUpdate)
            return { success: true, message: `Funcionário atualizado com sucesso!`, funcionarioUpdate}
        }catch(error){
            console.error(`Erro ao editar funcionário: ${error}`)
            return {success: false, message: `Erro ao editar funcionário!`}
        }
    }
    public async visualizarFuncionario(id: number){
        try{
            const funcionarioRepository = Connection.getRepository(Funcionario)
            const funcionario = await funcionarioRepository.findOne({where: {func_id: id}})
            if (!funcionario){
               return {success: false, message: `Funcionário não encontrado!`}
            }
            return { success: true, message: 'Funcionário encontrado!', funcionario }
        }catch(error){
            console.error(`Erro ao encontrar funcionário: ${error}`)
            return {success: false, message: `Erro ao encontrar o funcionário!`}            
        }
    }
    public async visualizarTodosFuncionarios(){
        try{
            const funcionarioRepository = Connection.getRepository(Funcionario)
            const funcionarios = await funcionarioRepository.find()
            if (!funcionarios || funcionarios.length === 0){
               return {success: false, message: `Nenhum funcionário encontrado!`}
            }
            return { success: true, message: 'Funcionários encontrados!', funcionarios }
        }catch(error){
            console.error(`Erro ao encontrar funcionários: ${error}`)
            return {success: false, message: `Erro ao encontrar os funcionários!`}            
        }
    }
    
    public async desativarFuncionario(id:number){
        try{
            const funcionarioRepository = Connection.getRepository(Funcionario)
            const funcionario = await funcionarioRepository.findOne({ where: {func_id: id}})
            if (!funcionario){
                return {success: false, message: `funcionario não entrado`}
            }
            funcionario.ativo = false
            await funcionarioRepository.save(funcionario)
            return {success: true, message: `funcionario desativado com sucesso`, funcionario}
        }catch (error){
            console.error(`Erro ao encontrar funcionario: ${error}`)
            return {success: false, message: `Erro ao encontrar o funcionario`}      
        }
    }
    private validarCpf(cpf: string): boolean{
        if(cpf.length !== 11){
            return false
        }
        // Verifica se todos os numeros são iguais
        if(/^(\d)\1{10}$/.test(cpf)){
            return false
        }

        // Calculando o primeiro digito verificador cpf[10]
        let soma = 0
        for (let i = 0; i < 9; i++){
            soma += parseInt(cpf.charAt(i)) * (10 - i)
        }
        let resto = soma % 11
        let digitoVerificador1: number
        if (resto < 2){
            digitoVerificador1 = 0
        }else{
            digitoVerificador1 = 11 - resto
        }       

        // Verifica se o primeiro digito verificador é diferente do que foi calulado
        if (parseInt(cpf.charAt(9)) !== digitoVerificador1){
            return false
        } 
        // Calcula o segundo digito vereficador
        soma = 0
        resto = 0
        for (let i= 0; i < 10; i++ ){
            soma += parseInt(cpf.charAt(i)) * (11 - i)
        }
        resto = soma % 11
        let digitoVerificador2: number
        if (resto < 2){
            digitoVerificador2 = 0
        }else{
            digitoVerificador2 = 11 - resto
        }

        // Verifica se o segundo digito verificador é diferente do que foi calculado 
        if(parseInt(cpf.charAt(10)) !== digitoVerificador2){
            return false
        }
        // CPF Valido
        return true
    }
}