import { rotaBase } from "../RotaBase/rotaBase";
import axios from "axios";

const CadastroClienteFunc = async (formData: any) => {
    console.log(formData)
    try {
        const resultado = await axios.post(`${rotaBase}/cadastroCliente`, formData,)
        return resultado.data;
    }
    catch (error) {
        console.error('Erro no cadastro', error)
        throw new Error('Erro ao cadastrar o cliente')
    }
};

export default CadastroClienteFunc