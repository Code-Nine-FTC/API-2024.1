import { rotaBase } from "../RotaBase/rotaBase";
import axios from "axios";

const CadastroFuncionarioFunc = async (formData: any) => {
    console.log(formData)
    try {
        const resultado = await axios.post(`${rotaBase}/cadastroFuncionario`, formData)
        return resultado.data
    }
    catch (error) {
        console.error('Erro no cadastro ', error)
        throw new Error('Erro ao cadastrar o funcionário')
    }
};

export default CadastroFuncionarioFunc;