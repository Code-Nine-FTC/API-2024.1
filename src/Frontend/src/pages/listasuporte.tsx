import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { rotaBase } from "../functions/RotaBase/rotaBase";
import Sidebar from "../component/sidebar/sidebar";
import styles from "../component/listarSuporte/listarSuporte.module.css";
import { Link } from "react-router-dom";
import { IFuncionarioView } from "../../../Backend/src/interfaces/IFuncionario";
import { getNivelAcesso, getToken } from "../services/auth";
import visualizarTodosFuncionarios from "../functions/View/viewTodosFuncionariosFunc";

const ListagemFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState<IFuncionarioView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const token = getToken();
  const nivelAcesso = getNivelAcesso();
  const navigate = useNavigate();

  useEffect(() => {
    if (nivelAcesso!== 'administrador') {
      navigate('/homesup');
      return;
    }

    const fetchFuncionarios = async () => {
      try {
        const resultadoListagem = await visualizarTodosFuncionarios();

        if (resultadoListagem.success) {
          setFuncionarios(resultadoListagem.funcionarios);
          setLoading(false);
          setError('');
        } else {
          setError("Erro ao carregar os dados dos funcionários");
          setLoading(false);
        }
      } catch (error) {
        setError("Erro ao carregar os dados dos funcionários");
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, []);

  const columns = [
    {
      header: "Nome",
      accessor: "func_nome"
    },
    {
      header: "CPF",
      accessor: "func_cpf"
    },
    {
      header: "E-mail",
      accessor: "func_email"
    },
    {
      header: "Ações",
      accessor: "func_id",
      render: (funcionario: { func_id: any; }) => (
        <Link
          id={styles.detalheslink}
          to={`/visualizarfuncionario/${funcionario.func_id}`}
          style={{ color: 'black'}}
        >
          Ver detalhes
        </Link>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h2 className={`${styles.center} ${styles.titleLine}`}>Funcionários Cadastrados</h2>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.header} scope="col">{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario) => (
              <tr key={funcionario.func_id}>
                <td>{funcionario.func_nome}</td>
                <td>{funcionario.func_cpf}</td>
                <td>{funcionario.func_email}</td>
                <td>
                  <Link
                    id={styles.detalheslink}
                    to={`/visualizarfuncionario/${funcionario.func_id}`}
                    style={{ color: 'black'}}
                  >
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.buttonContainer}>
          <Link to="/registrosuporte"> <button type="button">Cadastrar Atendente</button></Link>
        </div>
      </div>
    </div>
  );
};

export default ListagemFuncionarios;