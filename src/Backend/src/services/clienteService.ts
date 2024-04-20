import { IClienteInput, IClienteLoggin, IClienteUpdate, IClienteView } from "../interfaces/ICliente";
import Cliente from "../entities/cliente";
import { Connection } from "../config/data-source";

export class ClienteService {
    public async cadastrarCliente(dadosCliente: IClienteInput) {
        const clienteRepository = Connection.getRepository(Cliente)
        try {
            const novoCliente = clienteRepository.create(dadosCliente)
            await clienteRepository.save(novoCliente)
            return { success: true, message: "Cliente cadastrado com sucesso", cliente: novoCliente.cli_nome };
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            return { success: false, message: "Erro ao cadastrar cliente!" };
        }
    }
    public async logarCliente(dadosLogin: IClienteLoggin){
        const {cli_email, cli_senha} = dadosLogin
        const clienteRepository = Connection.getRepository(Cliente)
        try{
            const cliente = clienteRepository.findOne({ where: { cli_email }})
            if(cliente){
                if (cli_senha === (await cliente).cli_senha){
                    return { sucess: true, message: `Logging realizado com sucesso! :)`}
                }else{
                    return { sucess: false, message: `Senha incorreta!Tente novamente.`}
                }
            }else{
                return { sucess: false, message: `Cliente não encontrado! :(`}
            }
        }catch (error){
            console.error(`Erro ao logar cliente: ${error}`)
            return {sucess: false, message: `Erro ao logar cliente!`}
        }
    }
    public async editarCliente(id: number, dadosUpdate: IClienteUpdate){
        const clienteRepository = Connection.getRepository(Cliente)
        try{
            const cliente = await clienteRepository.findOne({ where: { cli_id:id }})
            if (cliente){
                const clienteUpdate = {...cliente, ...dadosUpdate}
                await clienteRepository.update(id, clienteUpdate)
                return { sucess: true, message: `Cliente atualizado com sucesso :)`}
            }else{
                return { sucess: false, message: `Cliente não encontrado! :(`}
            }
        }catch(error){
            console.error(`Erro ao editar cliente: ${error}`)
            return {sucess: false, message: `Erro ao editar cliente!`}
        }
    }
    public async visualizarCliente(id: number){
        const clienteRepository = Connection.getRepository(Cliente)
        try{
            const cliente = await clienteRepository.findOne({where: {cli_id: id}})
            if (cliente){
                return { success: true, message: 'Cliente encontrado!', cliente }
            }else{
                return {sucess: false, message: `Cliente não entrado! :(`}
            }
        }catch(error){
            console.error(`Erro ao encontrar cliente: ${error}`)
            return {sucess: false, message: `Erro ao encontrar o cliente!`}            
        }
    }
}