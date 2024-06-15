import React, { useState } from "react";
import Sidebar from "../component/sidebar/sidebar";
import CadastroFaqAdm from "../functions/faq/criarFaq";
import styles from "../component/chamadoAdm/chamadoAdm.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

interface IFaqInput {
  faq_exemplo: string;
  faq_titulo: string;
  faq_descricao: string;
}

const FAQAdm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFaqInput>({
    faq_exemplo: "",
    faq_titulo: "",
    faq_descricao: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const verificaCampoVazio = Object.values(formData).some(
        (value) =>
          typeof value === "string" &&
          (value.trim() === "" || value.trim().length === 0)
      );

      if (verificaCampoVazio) {
        toast.error("Por favor, preencha todos os campos corretamente.");
        return;
      }
      const resultado = await CadastroFaqAdm(formData);
      if (resultado?.success) {
        toast.success(resultado.message);
        navigate("/listafaqadm");
      } else {
        alert(resultado?.message || "Erro ao cadastrar FAQ.");
      }
    } catch (error: any) {
      console.error("Erro ao criar FAQ:", error);
      let errorMessage = error.message || 'Erro ao criar FAQ. Por favor, tente novamente mais tarde.';
            Swal.fire({
                title: 'Erro',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
            });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Sidebar />
      <div className={styles.container}>
        <header className={styles.title}>
          <h1>Criar FAQ</h1>
          <br />
          <br />
          <hr className={styles.linha} />
        </header>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div>
            <br />
            <input
              className={styles.seletor}
              type="text"
              id="faq_exemplo"
              name="faq_exemplo"
              maxLength={300}
              placeholder="Exemplo"
              value={formData.faq_exemplo}
              onChange={handleInputChange}
              required
            />
            <br />
          </div>
          <br />
          <div>
            <br />
            <input
              className={styles.seletor}
              type="text"
              id="faq_titulo"
              name="faq_titulo"
              maxLength={50}
              placeholder="Título do FAQ"
              value={formData.faq_titulo}
              onChange={handleInputChange}
              required
            />
            <br />
          </div>
          <br />
          <div>
            <br />
            <input
              className={styles.seletor}
              type="text"
              id="faq_descricao"
              name="faq_descricao"
              maxLength={300}
              placeholder="Descrição"
              value={formData.faq_descricao}
              onChange={handleInputChange}
              required
            />
            <br />
          </div>
          <br />
          <div className={styles.buttonsContainer}>
            <button type="submit" id={styles.Editar}>
              Salvar
            </button>
            <button
              type="button"
              id={styles.OutroBotao}
              onClick={() =>
                setFormData({
                  faq_exemplo: "",
                  faq_titulo: "",
                  faq_descricao: "",
                })
              }
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FAQAdm;
