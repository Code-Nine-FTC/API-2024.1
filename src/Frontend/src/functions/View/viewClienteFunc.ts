import axios from 'axios';
import { rotaBase } from '../RotaBase/rotaBase';

// Busca usuario no banco banco de dados com base no id fornecido
const viewCliente = async (cli_id: number, token: string | null) => {
  try {
    // envia o id 
    const response = await axios.post(`${rotaBase}/viewCliente`,{cli_id: cli_id}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.cliente;
  } catch (error) {
    throw new Error('Erro ao buscar cliente. Por favor, tente novamente mais tarde.');
  }
};

export default viewCliente