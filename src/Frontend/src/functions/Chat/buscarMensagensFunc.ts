import api from "../../services/api";

export default async function BuscarMensagens(id: number){
          try{
            const resultado = await api.post(`/buscarMensagens`, { cha_id: id })
            console.log(resultado.data.mensagem)
            return {mensagem: resultado.data.mensagem}
          } catch (error) {
            console.error('Erro ao buscar mensagem: ', error);
            throw new Error('Erro ao buscar mensagem');
        }
    };
    