import { rotaBase } from "../RotaBase/rotaBase";
import axios from "axios";
import IClienteUpdate from "./Interface/iClienteUpdate";

const updateCliente = async (cli_id: number , dadosUpdate: IClienteUpdate, token: string | null) => {
    try {
        console.log('id')
        console.log(cli_id)
        const resultado = await axios.put(`${rotaBase}/updateCliente`,{cli_id, dadosUpdate}, {
            headers: {
                Authorization: `Bearer ${token}`
              }
        }); 
        return {clienteUpdate :resultado.data.clienteUpdate, message: resultado.data.message}
    } catch (error) {
        console.error('Erro ao salvar dados: ', error);
        throw new Error('Erro ao salvar os dados');
    }
};

export default updateCliente