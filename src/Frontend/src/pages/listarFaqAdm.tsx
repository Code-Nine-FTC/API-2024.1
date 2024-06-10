import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../component/sidebar/sidebar";
import styles from "../component/listarSuporte/listarSuporte.module.css";
import ListarFaqs from "../functions/faq/listarFaq";
import { IFaqView } from "../../../Backend/src/interfaces/IFaq";
import { Link } from "react-router-dom";

const ListagemFaqs = () => {
  const [faqs, setFaqs] = useState<IFaqView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const resultadoListagem = await ListarFaqs();
        
        if (resultadoListagem.success) {
          setFaqs(resultadoListagem.faqs);
          setLoading(false);
          setError('');
        } else {
          setError("Erro ao carregar os dados das FAQs");
          setLoading(false);
        }
      } catch (error) {
        setError("Erro ao carregar os dados das FAQs");
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h2 className={`${styles.center} ${styles.titleLine}`}>FAQs Cadastradas</h2>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "red", display: 'flex', justifyContent: 'center' }}>{error}</p>}
        <div className={styles.customLayout}>
          {faqs.map((faq) => (
            <div className={styles.faqContainer} key={faq.faq_id}>
              <div className={styles.userData}>
                <h3>Título</h3>
                <span>{faq.faq_titulo}</span>
              </div>
              <div className={styles.userData}>
                <h3>Descrição</h3>
                <span>{faq.faq_descricao}</span>
              </div>
              <div className={styles.userData}>
                <h3>Data de Modificação</h3>
                <span>{new Date(faq.faq_data_modificacao).toLocaleString()}</span>
              </div>
              <div className={styles.userData}>
                <Link
                  id={styles.detalheslink}
                  to={`/editarfaq/${faq.faq_id}`}
                  style={{ color: 'black' }}
                >
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/faqadm">
            <button type="button">Cadastrar FAQ</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListagemFaqs;
