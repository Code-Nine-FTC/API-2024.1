import React, { useState, useEffect, FormEvent } from "react";
import styles from "../../component/editarCategoria/editarCategoria.module.css"; // Atualize o caminho para o CSS específico, se necessário
import Sidebar from "../../component/sidebar/sidebar";
import updateFaq from "../../functions/faq/updateFaq";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import deletarFaq from "../../functions/faq/deletarFaq";
import verFaq from "../../functions/faq/verFaq";

function EditarFaq() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [formUpdateFaq, setFormUpdateFaq] = useState({
    faq_exemplo: "",
    faq_titulo: "",
    faq_descricao: "",
  });
  // recupera as informações do faq
  useEffect(() => {
    async function buscaFaq() {
      if (!id) {
        navigate("/notfound");
        return;
      }

      const faq_id: number = parseInt(id, 10);
      try {
        const resultado = await verFaq(faq_id);
        if (resultado.success) {
          setFormUpdateFaq(resultado.faq);
        }
      } catch (error) {
        toast.error("Erro ao ver FAQ");
      }
    }
    buscaFaq();
  }, [id]);

  // Atuaiza os valores do form
  function handleInputChange(e : React.ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target
    setFormUpdateFaq((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  // Deleta o faq
  async function handleDeleteFaq() {
    if (!id) {
      navigate("/notfound");
      return;
    }

    const faq_id: number = parseInt(id, 10);
    try {
      const resultado = await deletarFaq(faq_id);
      if (resultado.success) {
        toast.success("FAQ deletado com sucesso!");
        navigate("/listafaqadm");
      } else {
        toast.error("Erro ao deletar FAQ: " + resultado.message);
      }
    } catch (error) {
      toast.error("Erro ao deletar FAQ");
    }
  }

  // Atualiza com as novas informações
  async function handleSaveChanges() {
    if (!id) {
      navigate("/notfound");
      return;
    }

    const faq_id: number = parseInt(id, 10);
    try {
      const verificaCampoVazio = Object.values(formUpdateFaq).some(value => 
        typeof value === 'string' && (value.trim() === "" || value.trim().length === 0)
      );
  
      if (verificaCampoVazio ) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
      }

      const resultado = await updateFaq(faq_id, formUpdateFaq);
      if (resultado.success) {
        toast.success("FAQ atualizado com sucesso!");
        navigate("/listafaqadm");
      } else {
        toast.error("Erro ao atualizar FAQ: " + resultado.message);
      }
    } catch (error) {
      toast.error("Erro ao atualizar FAQ");
    }
  }

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Sidebar />
      <div className={styles.conteudo}>
        <div className={styles.titulo}>
          <h1>Editar FAQ</h1>
        </div>
        <div className={styles.Container}>
          <div className={styles.conteudoform} >
            <div className={styles.Dados1}>
              <label>
                <h3 id={styles.subtitle}>Exemplo:</h3>
                <input
                  type="text"
                  name="faq_exemplo"
                  value={formUpdateFaq.faq_exemplo}
                  placeholder="Digite o exemplo aqui"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <h3 id={styles.subtitle}>Título:</h3>
                <input
                  type="text"
                  name="faq_titulo"
                  value={formUpdateFaq.faq_titulo}
                  placeholder="Digite o título aqui"
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <h3 id={styles.subtitle}>Descrição:</h3>
                <input
                  type="text"
                  value={formUpdateFaq.faq_descricao}
                  name="faq_descricao"
                  placeholder="Digite a descrição aqui"
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <button type="submit" className={styles.customButton} onClick={handleSaveChanges}>
              Salvar
            </button>
            <button
              type="button"
              className={styles.voltar}
              onClick={handleDeleteFaq}
            >
              Deletar
            </button>

            <button
              type="button"
              className={styles.voltar}
              onClick={() => navigate(`/listafaqadm`)}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditarFaq;
