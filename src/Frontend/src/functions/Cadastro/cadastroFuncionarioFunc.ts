import api from "../../services/api";

const CadastroFuncionarioFunc = async (formData: any) => {
    try {
        const resultado = await api.post(`/cadastroFuncionario`, formData)
        return resultado.data
    }
    catch (error) {
        console.error('Erro no cadastro ', error)
        throw new Error('Erro ao cadastrar o funcionário')
    }
};

export default CadastroFuncionarioFunc;