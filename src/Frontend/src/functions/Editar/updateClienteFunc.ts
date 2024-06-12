import IClienteUpdate from "./Interface/iClienteUpdate";
import api from "../../services/api";

const updateCliente = async ( dadosUpdate: IClienteUpdate) => {
    try {
        const resultado = await api.put(`/update/cliente`,{ dadosUpdate}); 
        return {clienteUpdate :resultado.data.clienteUpdate, message: resultado.data.message}
    } catch (error) {
        console.error('Erro ao salvar dados: ', error);
        throw new Error('Erro ao salvar os dados');
    }
};

export default updateCliente