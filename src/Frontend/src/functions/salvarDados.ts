import axios from 'axios';
import { rotaBase } from './rotaBase';

interface User {
  func_id: string;
  func_nome: string;
  func_email: string;
  func_senha: string;
  func_tiposuport: string;
  func_cpf: string;
  func_telefone: string;
}

const salvarDadosFuncionario = async (user: User): Promise<void> => {
  try {
   
    await axios.put(`${rotaBase}/updateFuncionários${user.func_id}`, user);
  } catch (error) {
    throw new Error('Erro ao salvar os dados do usuário');
  }
};

export default salvarDadosFuncionario;
