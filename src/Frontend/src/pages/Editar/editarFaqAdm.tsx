import React, { useState, useEffect, FormEvent } from 'react';
import styles from "../../component/editarCategoria/editarCategoria.module.css"; // Atualize o caminho para o CSS específico, se necessário
import Sidebar from '../../component/sidebar/sidebar';
import updateFaq from '../../functions/faq/updateFaq';
import { useNavigate, useParams } from 'react-router-dom';
import { IFaqUpdate } from '../../../../Backend/src/interfaces/IFaq';
import { toast, Toaster } from 'react-hot-toast';

function EditarFaq() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  // Estados para armazenar os dados do formulário
  const [exemplo, setExemplo] = useState<string>('');
  const [titulo, setTitulo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      navigate('/notfound');
      return;
    }

    const faq_id: number = parseInt(id, 10);

    const dadosUpdate: IFaqUpdate = {
      faq_exemplo: exemplo,
      faq_titulo: titulo,
      faq_descricao: descricao,
    };

    try {
      const resultado = await updateFaq(faq_id, dadosUpdate);
      if (resultado.success) {
        toast.success('FAQ editado com sucesso!');
        navigate('/listafaqadm');
      } else {
        toast.error('Erro ao editar FAQ: ' + resultado.message);
      }
    } catch (error) {
      toast.error('Erro ao editar FAQ');
    }
  };

  return (
    <>
      <div>
        <Toaster 
          position="top-center"
          reverseOrder={false}
        />
      </div>
      <Sidebar />
      <div className={styles.conteudo}>
        <div className={styles.titulo}>
          <h1>Editar FAQ</h1>
        </div>
        <div className={styles.Container}>
          <form className={styles.conteudoform} onSubmit={handleSubmit}>
            <div className={styles.Dados1}>
              <label>
                <h3 id={styles.subtitle}>Novo exemplo:</h3>
                <input
                  type="text"
                  value={exemplo}
                  placeholder="Digite o novo exemplo aqui"
                  onChange={e => setExemplo(e.target.value)}
                />
              </label>
              <label>
                <h3 id={styles.subtitle}>Novo título:</h3>
                <input
                  type="text"
                  value={titulo}
                  placeholder="Digite o novo título aqui"
                  onChange={e => setTitulo(e.target.value)}
                />
              </label>
              <label>
                <h3 id={styles.subtitle}>Nova descrição:</h3>
                <input
                  type="text"
                  value={descricao}
                  placeholder="Digite a nova descrição aqui"
                  onChange={e => setDescricao(e.target.value)}
                />
              </label>
            </div>
            <button type="submit" className={styles.customButton}>Salvar</button>
            <button type="button" className={styles.voltar} onClick={() => navigate(`/listafaqadm`)}>Voltar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditarFaq;
