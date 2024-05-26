import axios from "axios";
import api from "../../services/api";
import { rotaBase } from "../RotaBase/rotaBase";

const ListarCategorias = async () => {
    try {
        const resultado = await api.get(`/listarCategorias`);
        return {success: resultado.data.success, categorias: resultado.data.categorias};
    } catch (error) {
        console.error('Erro ao listar categorias: ', error);
        return {success: false, message: 'Erro ao listar categorias.'};
    }
};

export default ListarCategorias;
