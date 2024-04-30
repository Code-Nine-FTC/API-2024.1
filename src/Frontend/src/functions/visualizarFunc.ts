import axios from 'axios';
import { rotaBase } from './rotaBase';

const VisualizarFuncionarios = async () => {
  try {
    // Realiza uma requisição GET para a rota '/api/funcionarios'
    const response = await axios.get(`${rotaBase}/visualizarTodosFuncionarios`);
    
    // Retorna os dados recebidos da API
    return response.data;
  } catch (error) {
    // Em caso de erro, lança uma exceção
    throw new Error('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  }
};

export default VisualizarFuncionarios;
