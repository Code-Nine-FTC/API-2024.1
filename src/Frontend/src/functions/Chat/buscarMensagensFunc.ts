import api from "../../services/api";
import { useEffect, useState } from "react";

export default function BuscarMensagens(id: number){
    const [mensagem, setMensagens] = useState<any>(null);
    useEffect(() => {
        const fetchMensagens = async () => {
          try {
            const resultado = await api.post(`/buscarMensagens`, id)
          ;
            setMensagens(resultado.data.chamado);
          } catch (error) {
            console.error('Erro ao buscar mensagem: ', error);
            throw new Error('Erro ao buscar mensagem');
        }
        };
        fetchMensagens();
      }, []);
      return mensagem
}