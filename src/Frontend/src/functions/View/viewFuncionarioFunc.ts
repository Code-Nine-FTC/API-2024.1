import api from '../../services/api';

// Busca usuario no banco banco de dados com base no id fornecido
const viewFuncionario = async (func_id: number) => {
  try {
    const response = await api.get(`/ver/funcionario/${func_id}`);
    return response.data.funcionario;
  } catch (error) {
    throw new Error('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  }
};

export default viewFuncionario