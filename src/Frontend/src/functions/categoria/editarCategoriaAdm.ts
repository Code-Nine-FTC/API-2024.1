import api from "../../services/api";
import { ICategoriaUpdate } from "../../../../Backend/src/interfaces/ICategoria";

const updateCategoria = async (cat_id: number, dadosUpdate: ICategoriaUpdate) => {
    try {
        const resultado = await api.put(`/editarCategoria/${cat_id}`, dadosUpdate);
        return { updateCategoria: resultado.data.updateCategoria, message: resultado.data.message, success: resultado.data.success };
    } catch (error) {
        console.error('Erro ao editar categoria: ', error);
        throw new Error('Erro ao salvar' );
    }
};

export default updateCategoria;






