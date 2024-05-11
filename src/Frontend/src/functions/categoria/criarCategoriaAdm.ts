import axios from "axios";
import { rotaBase } from "../RotaBase/rotaBase";

const CadastroCategoriaAdm = async (formData: { cat_titulo: string; cat_horario: string; cat_prioridade: string }) => {
    const token = localStorage.getItem('token');
    
    try {
        const resultado = await axios.post(`${rotaBase}/categoria`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return resultado.data;
    } catch (error) {
        console.error('Erro no cadastro ', error);
        throw new Error('Erro ao cadastrar categoria');
    }
};

export default CadastroCategoriaAdm;