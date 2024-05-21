import { rotaBase } from "../RotaBase/rotaBase";
import axios from "axios";
import { AxiosError } from "axios";

const CadastroClienteFunc = async (formData: any) => {
    console.log(formData)
    try {
        const resultado = await axios.post(`${rotaBase}/cadastroCliente`, formData,)
        if (!resultado.data.success) {
            throw new Error(resultado.data.message);
        }
        return resultado.data;
    }
    catch (error) {
        let errorMessage = (error as AxiosError).response?.data as any;
        errorMessage = errorMessage?.message || 'Erro ao realizar o cadastro. Por favor, tente novamente mais tarde.';
        throw new Error(errorMessage);
    }
};

export default CadastroClienteFunc