import axios from 'axios';
import { rotaBase } from '../RotaBase/rotaBase';

const visualizarTodosFuncionarios = async () => {
  try {
    const response = await axios.get(`${rotaBase}/visualizarTodosFuncionarios`);
    return response.data.funcionarios;
  } catch (error) {
    throw new Error('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  }
};

export default visualizarTodosFuncionarios;