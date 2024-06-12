import api from "../../services/api"

export default async function BuscarNomeCliente(){
            try {
                const resultado = await api.get(`/chat/cliente`)
                return {name: resultado.data.cliente.cli_nome};
            } catch (error) {
                console.error('Erro ao buscar nome de cliente: ', error);
                throw new Error('Erro ao buscar nome de cliente');
            } 
        }

    
