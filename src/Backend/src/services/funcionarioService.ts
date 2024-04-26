import { IFuncionarioInput, IFuncionarioUpdate, IFuncionarioView, IFuncionarioLoggin } from "../interfaces/IFuncionario";
import Funcionario from "../entities/funcionario";
import { Connection } from "../config/data-source";
import * as bcrypt from 'bcrypt';


export class FuncionarioService {
    public async cadastrarFuncionario(dadosFuncionario: IFuncionarioInput) {
        const funcionarioRepository = Connection.getRepository(Funcionario);
        try {
            const funcionarioExistente = await funcionarioRepository.findOne({where: {func_cpf: dadosFuncionario.func_cpf}});
            if (funcionarioExistente) {
                return { success: false, message: "CPF já cadastrado." };
            }
            // Criptografia
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(dadosFuncionario.func_senha, saltRounds);
            const novoFuncionario = funcionarioRepository.create({
                ...dadosFuncionario,
                func_senha: hashedPassword, // Senha criptografada
            });
            await funcionarioRepository.save(novoFuncionario);
            return { success: true, message: "Funcionário cadastrado com sucesso", funcionario: novoFuncionario.func_nome };
        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
            return { success: false, message: "Erro ao cadastrar funcionário!" };
        }
    }

    public async logginFuncionario(dadosLoggin: IFuncionarioLoggin) {
        const funcionarioRepository = Connection.getRepository(Funcionario);
        try {
            const funcionario = await funcionarioRepository.findOne({ where: { func_cpf: dadosLoggin.func_cpf } });
            if (funcionario) {
                if (dadosLoggin.func_cpf === '98765432101' && dadosLoggin.func_senha === 'code12345') {
                    // Admin
                    return { success: true, message: 'Login bem sucedido!', funcionario };
                } else {
                    // Funcionário
                    if (bcrypt.compareSync(dadosLoggin.func_senha, funcionario.func_senha)) {
                        return { success: true, message: 'Login bem sucedido! (Funcionário)', funcionario };
                    } else {
                        return { success: false, message: 'Dados inválidos!' };
                    }
                }
            } else {
                return { success: false, message: 'Funcionário não encontrado!' };
            }
        } catch (error) {
            console.error(`Erro ao fazer login: ${error}`);
            return { success: false, message: 'Erro ao fazer login!' };
        }
    }
    
    
    public async editarFuncionario(id: number, dadosUpdate: IFuncionarioUpdate){
        const funcionarioRepository = Connection.getRepository(Funcionario)
        try{
            const funcionario = await funcionarioRepository.findOne({ where: { func_id:id }})
            if (funcionario){
                const funcionarioUpdate = {...funcionario, ...dadosUpdate}
                await funcionarioRepository.update(id, funcionarioUpdate)
                return { success: true, message: `Funcionário atualizado com sucesso!`}
            }else{
                return { success: false, message: `Funcionário não encontrado!`}
            }
        }catch(error){
            console.error(`Erro ao editar funcionário: ${error}`)
            return {success: false, message: `Erro ao editar funcionário!`}
        }
    }
    public async visualizarFuncionario(id: number){
        const funcionarioRepository = Connection.getRepository(Funcionario)
        try{
            const funcionario = await funcionarioRepository.findOne({where: {func_id: id}})
            if (funcionario){
                return { success: true, message: 'Funcionário encontrado!', funcionario }
            }else{
                return {success: false, message: `Funcionário não encontrado!`}
            }
        }catch(error){
            console.error(`Erro ao encontrar funcionário: ${error}`)
            return {success: false, message: `Erro ao encontrar o funcionário!`}            
        }
    }
}