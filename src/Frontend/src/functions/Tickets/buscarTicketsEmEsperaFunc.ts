import api from "../../services/api";

const BuscarTicketsEmEspera = async (user: string | null) => {
    switch(user){
        case 'atendente':
            try{
                const resposta = await api.get('/todos/chamados/em/espera')
                console.log(resposta.data.funcionarios)
                return resposta.data
            }
            catch(error){
                throw new Error('Erro ao buscar os chamados. Por favor, tente novamente mais tarde.');
            }
        case 'administrador':
            try{
                const resposta = await api.get('/todos/chamados/em/espera')
                console.log(resposta.data.funcionarios)
                return resposta.data
            }
            catch(error){
                throw new Error('Erro ao buscar os chamados. Por favor, tente novamente mais tarde.');
            }
    }
}

export default BuscarTicketsEmEspera