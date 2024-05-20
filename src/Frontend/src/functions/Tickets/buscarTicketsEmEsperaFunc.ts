import api from "../../services/api";

const BuscarTicketsEmEspera = async (user: string | null) => {
    switch(user){
        case 'atendente':
            try{
                const resposta = await api.get('/chamadosEmEspera')
                console.log(resposta.data.chamados)
                return resposta.data
            }
            catch(error){
                throw new Error('Erro ao buscar o chamado Por favor, tente novamente mais tarde.');
            }
        case 'administrador':
            try{
                const resposta = await api.get('/chamadoEmEspera')
                console.log(resposta.data.chamados)
                return resposta.data
            }
            catch(error){
                throw new Error('Erro ao buscar o chamado!');
            }
    }
}

export default BuscarTicketsEmEspera