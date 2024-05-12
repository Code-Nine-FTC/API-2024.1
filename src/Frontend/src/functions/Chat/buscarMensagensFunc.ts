import api from "../../services/api";
import { useEffect, useState } from "react";

export default function BuscarMensagens(id: number){
    const [mensagem, setMensagens] = useState<any>(null);
    useEffect(() => {
        const fetchMensagens = async () => {
          console.log(id)
          try {
            const resultado = await api.post(`/buscarMensagens`, { cha_id: id })
          ;
            setMensagens(resultado.data.respostas);
            console.log(mensagem)
          } catch (error) {
            console.error('Erro ao buscar mensagem: ', error);
            throw new Error('Erro ao buscar mensagem');
        }
        };
        fetchMensagens();
      }, []);
      return mensagem
}