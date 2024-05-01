import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import VisualizarFuncionarios from '../functions/visualizarFunc';
import {IFuncionarioView} from '../../../Backend/src/interfaces/IFuncionario'


const ListagemFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState<IFuncionarioView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // useEffect(() => {
  //   const fetchFuncionarios = async () => {
  //     try {
        
  //       const response = await axios.get(`${rotaBase}/visualizarTodosFuncionarios`);
        
  //       setFuncionarios(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError('Erro ao buscar funcionários. Por favor, tente novamente mais tarde.');
  //       setLoading(false);''
  //     }
  //   };

 
  //   fetchFuncionarios();
  // }, []);

  return (
    <div>
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