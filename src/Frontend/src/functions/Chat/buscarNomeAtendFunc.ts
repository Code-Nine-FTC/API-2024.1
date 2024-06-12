import api from "../../services/api"

export default async function BuscarNomeAtendente(id: number) {
            try {
                const resultado = await api.get(`/chat/funcionario/${id}`)
                return {name: resultado.data.funcionario.func_nome}
            } catch (error) {
                console.error('Erro ao buscar nome de funcionario: ', error);
                throw new Error('Erro ao buscar nome de funcionario');
            } 
        }

    