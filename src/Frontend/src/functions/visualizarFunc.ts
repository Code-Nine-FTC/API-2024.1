import axios from 'axios';
import { rotaBase } from './rotaBase';

const buscarFuncionarios = async () => {
  try {
    const response = await axios.get(`${rotaBase}/visualizarTodosFuncionarios`);
    return response.data.funcionarios;
  } catch (error) {
    throw new Error('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  }
};

export default buscarFuncionarios;