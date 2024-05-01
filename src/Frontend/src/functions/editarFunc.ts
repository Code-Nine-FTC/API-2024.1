import { rotaBase } from "./rotaBase";
import axios from "axios";

const SalvarDadosFunc = async (formData: any) => {
    console.log(formData);
    try {
        const resultado = await axios.post(`${rotaBase}/updateFuncionario/`, formData); 
        return resultado.data;
    } catch (error) {
        console.error('Erro ao salvar dados: ', error);
        throw new Error('Erro ao salvar os dados');
    }
};

export default SalvarDadosFunc;
