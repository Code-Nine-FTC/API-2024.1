import iChamadoViewMensagem from "../../functions/Tickets/interface/iChamado";
import api from "../../services/api";

export default async function BuscarChamado(id: number) {
          try {
            const resultado = await api.post(`/buscarChamado`, { cha_id: id })
            // console.log(resultado.data.chamado)
            console.log('black clevers: ', resultado.data.chamado)
            return {chamado: resultado.data.chamado}
          ;
          } catch (error) {
            console.error('Erro ao buscar chamado: ', error);
            throw new Error('Erro ao buscar chamado');
        }
        };

