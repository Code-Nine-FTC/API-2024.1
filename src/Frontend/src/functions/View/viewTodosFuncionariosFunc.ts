import axios from 'axios';
import { rotaBase } from '../RotaBase/rotaBase';
import api from '../../services/api';

const visualizarTodosFuncionarios = async () => {
  try {
    const response = await api.get(`/ver/todos/funcionarios`);
  
    return {funcionarios: response.data.funcionarios, success: response.data.success}
  } catch (error) {
    throw new Error('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  }
};

export default visualizarTodosFuncionarios;