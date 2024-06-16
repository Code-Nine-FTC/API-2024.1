import React, { useState, useEffect } from "react";
import Sidebar from "../component/sidebar/sidebar";
import styles from "../component/listarCategoria/listarcategoria.module.css";
import { Link } from "react-router-dom";
import ListarCategorias from "../functions/categoria/listarCategoriaAdm";
import { ICategoriaView } from "../../../Backend/src/interfaces/ICategoria";

interface Props {}

const ListagemCategorias: React.FC<Props> = () => {
  const [categorias, setCategorias] = useState<ICategoriaView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await ListarCategorias();
        if (response.success) {
          setCategorias(response.categorias);
          setLoading(false);
          setError("");
        } else {
          setError("Erro ao carregar as categorias");
          setLoading(false);
        }
      } catch (error) {
        setError("Erro ao carregar as categorias");
        setLoading(false);
      }
    };

    fetchCategorias();
    return () => {}; // Adiciona uma função de cleanup vazia
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h2 className={`${styles.center} ${styles.titleLine}`}>Categorias Cadastradas</h2>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className={styles.customLayout}>
        <table className={styles.categoryTable}>
  <thead>
    <tr>
      <th>Categoria</th>
      <th>Horário</th>
      <th>Prioridade</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    {categorias.map((categoria) => (
      <tr key={categoria.cat_id}>
        <td>{categoria.cat_titulo}</td>
        <td>{categoria.cat_horario}</td> 
        <td>{categoria.cat_prioridade.charAt(0).toUpperCase() + categoria.cat_prioridade.slice(1)}</td>
        <td>
          <Link
            id={styles.detalheslink}
            to={`/editarcategoria/${categoria.cat_id}`}
            title="Editar categoria"
            style={{ color: 'black' }}
          >
            Editar
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/ticketadm">
            <button type="button">Criar Categoria</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListagemCategorias;