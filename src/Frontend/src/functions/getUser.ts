import axios from 'axios';
import { rotaBase } from './rotaBase';
import { IFuncionarioView } from '../../../Backend/src/interfaces/IFuncionario';

interface UserData {
  func_id: string;
  func_nome: string;
  func_email: string;
  func_senha: string;
  func_tiposuport: string;
  func_cpf: string;
  func_telefone: string;
}

const getUserData = async (funcionarioId: string): Promise<UserData> => {
  try {
    const response = await axios.get(`${rotaBase}/visualizarFuncionarios/${funcionarioId}`);
    return response.data as UserData;
  } catch (error) {
    throw new Error('Erro ao obter os dados do usuário');
  }
};



export default getUserData;

