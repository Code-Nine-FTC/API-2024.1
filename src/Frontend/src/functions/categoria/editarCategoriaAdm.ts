import api from "../../services/api";
import { ICategoriaUpdate } from "../../../../Backend/src/interfaces/ICategoria";

const updateCategoria = async (cat_id: number, dadosUpdate: ICategoriaUpdate) => {
    try {
        const resultado = await api.put(`/editar/categoria/${cat_id}`, dadosUpdate);
        return resultado.data
    } catch (error) {
        console.error('Erro ao editar categoria: ', error);
        throw new Error('Erro ao salvar' );
    }
};

export default updateCategoria;






