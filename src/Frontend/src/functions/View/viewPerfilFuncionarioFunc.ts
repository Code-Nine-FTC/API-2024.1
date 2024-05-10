import api from '../../services/api';

const viewPerfilFuncionario = async () => {
  try {
    const response = await api.get(`/viewPerfilFuncionario`);// envia o id do funcionario que deseja ver
    return response.data.funcionario;
  } catch (error) {
    throw new Error('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  }
};

export default viewPerfilFuncionario