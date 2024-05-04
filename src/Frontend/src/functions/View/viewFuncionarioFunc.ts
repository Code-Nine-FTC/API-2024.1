
import axios from 'axios';
import { rotaBase } from '../rotaBase';

// Busca usuario no banco banco de dados com base no id fornecido
const viewFuncionario = async (func_id: number) => {
  try {
    // envia o id 
    const response = await axios.post(`${rotaBase}/viewFuncionario`,{func_id: func_id});
    return response.data.funcionario;
  } catch (error) {
    throw new Error('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  }
};

export default viewFuncionario;