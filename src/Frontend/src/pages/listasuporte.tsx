import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { rotaBase } from '../functions/rotaBase'; // Importe a rotaBase do arquivo correto
import { IFuncionarioView } from '../../../Backend/src/interfaces/IFuncionario'; // Certifique-se de importar a interface correta
import Sidebar from '../component/sidebar/sidebar';

const ListagemFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState<IFuncionarioView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get(`${rotaBase}/visualizarTodosFuncionarios`);
        setFuncionarios(response.data.funcionarios);
        setLoading(false);
      } catch (error) {
        setError('Erro ao salvar os dados');
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, []);

  return (
    <div>
      <Sidebar userTipo='Admin'/>
      <h2>Lista de Funcionários</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {funcionarios.map(funcionario => (
          <li key={funcionario.func_cpf}>
            <strong>Nome:</strong> {funcionario.func_nome}, <strong>CPF:</strong> {funcionario.func_cpf}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListagemFuncionarios;





