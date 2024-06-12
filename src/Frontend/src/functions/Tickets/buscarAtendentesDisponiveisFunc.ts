import api from "../../services/api";

const BuscarAtendentesDisponiveis = async () => {
    try {
    const resposta = await api.get('/todos/funcionarios/disponiveis')
    console.log(resposta.data.funcionarios)
    return resposta.data
    }
    catch(error){
        throw new Error('Erro ao buscar os funcionários. Por favor, tente novamente mais tarde.');
    }
}

export default BuscarAtendentesDisponiveis