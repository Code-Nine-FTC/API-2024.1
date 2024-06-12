import axios from "axios";
import { rotaBase } from "../RotaBase/rotaBase";
import api from "../../services/api";

interface ICategoriaInput {
    cat_titulo: string
    cat_horario: string
    cat_prioridade: string
}

const CadastroCategoriaAdm = async (formData: ICategoriaInput) => {
    try {
        const resultado = await api.post(`/criar/categoria`, formData);
        return {success: resultado.data.success, message: resultado.data.message, categoria: resultado.data.categoria};
    } catch (error) {
        console.error('Erro no cadastro ', error);
    }
};

export default CadastroCategoriaAdm;
