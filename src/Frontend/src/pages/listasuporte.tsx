import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { rotaBase } from '../functions/rotaBase';
import { IFuncionarioView } from '../../../Backend/src/interfaces/IFuncionario';
import Sidebar from '../component/sidebar/sidebar';
import styles from '../component/listarSuporte/listarSuporte.module.css'; // Importe o arquivo de estilos CSS

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
      <h2>Lista de Funcionários</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className={styles.listaFuncionarios}> 
        {funcionarios.map(funcionario => (
          <li key={funcionario.func_cpf}>
            <a href={`//${funcionario.func_id}`}>
              <strong>Nome:</strong> {funcionario.func_nome}, <strong>CPF:</strong> {funcionario.func_cpf}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListagemFuncionarios;
