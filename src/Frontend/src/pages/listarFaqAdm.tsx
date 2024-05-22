import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../component/sidebar/sidebar";
import styles from "../component/listarSuporte/listarSuporte.module.css";
import ListarFaqs from "../functions/faq/listarFaq";
import { IFaqView } from "../../../Backend/src/interfaces/IFaq"


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
          setLoading(false); // Corrigido para false aqui
          setError('');
        } else {
          setError("Erro ao carregar os dados das FAQs");
          setLoading(false); // Corrigido para false aqui também
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className={styles.customLayout}>
          {faqs.map((faq: any) => (
            <div className={styles.faqContainer} key={faq.faq_id}>
              <div className={styles.faqData}>
                <h3>Título</h3>
                <span>{faq.faq_titulo}</span>
              </div>
              <div className={styles.faqData}>
                <h3>Descrição</h3>
                <span>{faq.faq_descricao}</span>
              </div>
              <div className={styles.faqData}>
                <h3>Data de Modificação</h3>
                <span>{new Date(faq.faq_data_modificacao).toLocaleString()}</span>
              </div>
              <div className={styles.faqData}>
                <a
                  id={styles.detalheslink}
                  href={`/visualizarfaq/${faq.faq_id}`}
                  style={{ color: 'black' }}
                >
                  Ver detalhes
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <a href="/faqadm"><button type="button">Cadastrar FAQ</button></a>
        </div>
      </div>
    </div>
  );
};

export default ListagemFaqs;
