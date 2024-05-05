import { rotaBase } from "../RotaBase/rotaBase";
import axios from "axios";
import  IFuncionarioUpdate  from "./interface/IFuncionarioUpdate"

const updateFuncionario = async (func_id: number, dadosUpdate: IFuncionarioUpdate, token: string | null) => {
    try {
        const resultado = await axios.put(`${rotaBase}/updateFuncionario`,{func_id, dadosUpdate}, {
            headers: {
                Authorization: `Bearer ${token}`
              }
        }); 
        return {funcionarioUpadate :resultado.data.funcionarioUpdate, message: resultado.data.message}
    } catch (error) {
        console.error('Erro ao salvar dados: ', error);
        throw new Error('Erro ao salvar os dados');
    }
};

export default updateFuncionario