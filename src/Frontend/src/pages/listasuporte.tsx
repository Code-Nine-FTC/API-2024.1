import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { rotaBase } from "../functions/RotaBase/rotaBase";
import Sidebar from "../component/sidebar/sidebar";
import styles from "../component/listarSuporte/listarSuporte.module.css";
import { Link } from "react-router-dom";
import { IFuncionarioView } from "../../../Backend/src/interfaces/IFuncionario";

const ListagemFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState<IFuncionarioView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const token = localStorage.getItem('token')
  const nivelAcesso = localStorage.getItem('nivel')
  const navigate = useNavigate();

  useEffect(() => {
    if (nivelAcesso !== 'administrador') {
      navigate('/homesup');
      return
  }

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
        setError("Erro ao carregar os dados dos funcionários");
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h2 className={`${styles.center} ${styles.titleLine}`}>Funcionários Cadastrados</h2>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className={styles.customLayout}>
          <div className={styles.nomeColumn}>
            <h3>Nome</h3>
            {funcionarios.map((funcionario) => (
              <div key={funcionario.func_cpf}>
                <div className={styles.nameAndCpfLine}>
                  <span>{funcionario.func_nome}</span>
                  <Link to={`/visualizarfuncionario/${funcionario.func_cpf}`}>
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cpfColumn}>
            <h3>CPF</h3>
            {funcionarios.map((funcionario) => (
              <div key={funcionario.func_cpf}>{funcionario.func_cpf}</div>
            ))}
          </div>
          <div className={styles.emailColumn}>
            <h3>E-mail</h3>
            {funcionarios.map((funcionario) => (
              <div key={funcionario.func_cpf}>{funcionario.func_email}</div>
            ))}
          </div>
          {/* Add more columns for other details like password, working hours, etc. */}
        </div>
        <Link to="/registrosuporte">
          <div className={styles.buttonContainer}>
            <button type="button">Cadastrar Atendente</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ListagemFuncionarios;