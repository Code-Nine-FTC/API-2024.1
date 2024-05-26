import axios from 'axios';
import { rotaBase } from '../RotaBase/rotaBase';
import api from '../../services/api';

// Busca usuario no banco banco de dados com base no id fornecido
const viewFuncionario = async (func_id: number) => {
  try {
    const response = await api.post(`/viewFuncionario`,{func_id: func_id});// envia o id do funcionario que deseja
    return response.data.funcionario;
  } catch (error) {
    throw new Error('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  }
};

export default viewFuncionario