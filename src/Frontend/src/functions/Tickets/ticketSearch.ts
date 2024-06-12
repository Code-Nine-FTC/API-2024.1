import api from '../../services/api';

const visualizarTodasCategorias = async () => {
  try {
    const response = await api.get(`/todas/categorias`);
  
    return {categorias: response.data.categorias, success: response.data.success}
  } catch (error) {
    throw new Error('Erro ao buscar categorias. Por favor, tente novamente mais tarde.');
  }
};

export default visualizarTodasCategorias;