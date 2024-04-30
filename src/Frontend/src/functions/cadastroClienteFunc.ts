import { rotaBase } from "./rotaBase";
import axios from "axios";

const CadastroClienteFunc = async (formData: any) => {
    try {
        const resultado = await axios.post(`http://localhost:5000/cadastroCliente`, formData)
        return resultado.data;
    }
    catch (error) {
        console.error('Erro no cadastro', error)
        throw new Error('Erro ao cadastrar o cliente')
    }
};

export default CadastroClienteFunc