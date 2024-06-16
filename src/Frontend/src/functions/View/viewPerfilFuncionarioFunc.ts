import api from '../../services/api';

const viewPerfilFuncionario = async () => {
  try {
    const response = await api.get(`/ver/perfil/funcionario`)
    return response.data.funcionario;
  } catch (error) {
    throw new Error('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  }
};

export default viewPerfilFuncionario