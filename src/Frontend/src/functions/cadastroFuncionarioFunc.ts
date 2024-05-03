import { rotaBase } from "./rotaBase";
import axios from "axios";

const CadastroFuncionarioFunc = async (formData: any) => {
    const token = localStorage.getItem('token')
    console.log(formData)
    try {
        const resultado = await axios.post(`${rotaBase}/cadastroFuncionario`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          });      
        return resultado.data
    }
    catch (error) {
        console.error('Erro no cadastro ', error)
        throw new Error('Erro ao cadastrar o funcionário')
    }
};

export default CadastroFuncionarioFunc;