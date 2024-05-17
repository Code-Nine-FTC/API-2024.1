import React, { useState, useEffect } from "react";
import Sidebar from "../component/sidebar/sidebar";
import styles from "../component/listarSuporte/listarSuporte.module.css";
import { Link } from "react-router-dom";
import ListarCategorias from "../functions/categoria/listarCategoriaAdm";
import { ICategoriaView } from "../../../Backend/src/interfaces/ICategoria";

const ListagemCategorias = () => {
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
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h2 className={`${styles.center} ${styles.titleLine}`}>Categorias Cadastradas</h2>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className={styles.customLayout}>
          {categorias.map((categoria, index) => (
            <div className={styles.categoriaContainer} key={index}>
              {Object.entries(categoria).map(([key, value]) => (
                <div className={styles.userData} key={key}>
                  <h3>{key}</h3>
                  <span>{value}</span>
                </div>
              ))}
              <div className={styles.userData}>
                <Link
                  id={styles.detalheslink}
                  to={`/editarcategoria/${categoria.cat_id}`} // Convertendo para string aqui
                  style={{ color: 'black'}}>
                  Editar
                </Link>
              </div>
            </div>
          ))}
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

