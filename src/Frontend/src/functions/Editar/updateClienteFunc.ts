import { rotaBase } from "../RotaBase/rotaBase";
import axios from "axios";
import IClienteUpdate from "../Editar/Interface/iClienteUpdate";
import api from "../../services/api";

const updateCliente = async ( dadosUpdate: IClienteUpdate) => {
    try {
        const resultado = await api.put(`/updateCliente`,{ dadosUpdate}); 
        return {clienteUpdate :resultado.data.clienteUpdate, message: resultado.data.message}
    } catch (error) {
        console.error('Erro ao salvar dados: ', error);
        throw new Error('Erro ao salvar os dados');
    }
};

export default updateCliente