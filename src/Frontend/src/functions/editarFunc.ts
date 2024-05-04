import { rotaBase } from "./rotaBase";
import axios from "axios";

export interface IFuncionarioUpdate{
    func_nome?: string
    func_cpf?: string
    func_email?: string
    func_senha?: string
    func_expediente_inicio?: string
    func_expediente_final?: string
    ativo?: boolean
}
const updateFuncionario = async (func_id: number, dadosUpdate: IFuncionarioUpdate) => {
    try {
        const resultado = await axios.put(`${rotaBase}/updateFuncionario`,{func_id, dadosUpdate}); 
        return {funcionarioUpadate :resultado.data.funcionarioUpdate, message: resultado.data.message}
    } catch (error) {
        console.error('Erro ao salvar dados: ', error);
        throw new Error('Erro ao salvar os dados');
    }
};

export default updateFuncionario