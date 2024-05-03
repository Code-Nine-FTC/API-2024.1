import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { rotaBase } from '../functions/rotaBase';
import { IFuncionarioView } from '../../../Backend/src/interfaces/IFuncionario';
import Sidebar from '../component/sidebar/sidebar';
import styles from '../component/listarSuporte/listarSuporte.module.css'; // Importe o arquivo de estilos CSS
import { Link, useNavigate } from 'react-router-dom';


const ListagemFuncionarios = () => {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState<IFuncionarioView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get(`${rotaBase}/visualizarTodosFuncionarios`, {
          headers: {
            Authorization: `Bearer ${token}`
        }
      });      
        setFuncionarios(response.data.funcionarios);
        setLoading(false);
      } catch (error) {
        setError('Erro ao salvar os dados');
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, []);

  const handleClick = (funcionarioId: string) => {
    navigate(`/editarsuporte/${funcionarioId}`);
  };

  return (
    <div className={styles.container}>

      <Sidebar/>
     
      <div className={styles.content}>
        <h2 className={`${styles.center} ${styles.titleLine}`}>Suportes cadastrados</h2>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className={styles.customLayout}>
          <div className={styles.nomeColumn}>
            <h3>Nome</h3>
            <div className={styles.nameAndCpfLine}></div>
            {funcionarios.map(funcionario => (
              <div key={funcionario.func_cpf} onClick={() => handleClick(funcionario.func_id)}>{funcionario.func_nome}</div>
            ))}
          </div>
          <div className={styles.cpfColumn}>
            <h3>CPF</h3>
            <div className={styles.nameAndCpfLine1}></div>
            {funcionarios.map(funcionario => (
              <div key={funcionario.func_cpf}>{funcionario.func_cpf}</div>
            ))}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/registrosuporte"> Cadastrar atendente </Link>
      </div>

      </div>
    </div>
  );
};

export default ListagemFuncionarios;
