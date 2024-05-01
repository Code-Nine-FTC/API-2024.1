import axios from 'axios';
import { rotaBase } from './rotaBase';

// Interface para os dados de um funcionário
interface Funcionario {
  func_nome: string
  func_cpf: string
  func_email: string
  func_senha: string
  func_expediente_inicio: string
  func_expediente_final: string
  ativo: boolean
}

const buscarFuncionarios = async (): Promise<Funcionario[]> => {
  try {
    const response = await axios.get(`${rotaBase}/viewFuncionario`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  }
};

export default buscarFuncionarios;

