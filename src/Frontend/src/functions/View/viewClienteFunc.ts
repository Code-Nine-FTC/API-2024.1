import axios from 'axios';
import { rotaBase } from '../RotaBase/rotaBase';
import api from '../../services/api';

// Busca usuario no banco banco de dados com base no id fornecido
const viewCliente = async () => {
  try {
    const response = await api.get(`/ver/cliente`);
    return {cliente: response.data.cliente}
  } catch (error) {
    throw new Error('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  }
};

export default viewCliente