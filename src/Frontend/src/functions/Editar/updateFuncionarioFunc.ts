import  IFuncionarioUpdate  from "./Interface/IFuncionarioUpdate"
import api from "../../services/api";

const updateFuncionario = async (func_id: number, dadosUpdate: IFuncionarioUpdate) => {
    try {
        const resultado = await api.put(`/update/funcionario`,{func_id, dadosUpdate}); 
        return {funcionarioUpadate :resultado.data.funcionarioUpdate, message: resultado.data.message}
    } catch (error) {
        console.error('Erro ao salvar dados: ', error);
        throw new Error('Erro ao salvar os dados');
    }
};

export default updateFuncionario