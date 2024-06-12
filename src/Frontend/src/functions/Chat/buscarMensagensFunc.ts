import api from "../../services/api";

export default async function BuscarMensagens(id: number){
          try{
            const resultado = await api.get(`/buscar/mensagens/${id}`)
            return {mensagem: resultado.data.respostas}
          } catch (error) {
            console.error('Erro ao buscar mensagem: ', error);
            throw new Error('Erro ao buscar mensagem');
        }
    };
    