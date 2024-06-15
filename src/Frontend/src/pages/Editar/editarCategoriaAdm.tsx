import React, { useState, useEffect, FormEvent } from 'react';
import styles from "../../component/editarCategoria/editarCategoria.module.css";
import Sidebar from '../../component/sidebar/sidebar';
import updateCategoria from '../../functions/categoria/editarCategoriaAdm';
import { useNavigate, useParams } from 'react-router-dom';
import { ICategoriaUpdate } from '../../../../Backend/src/interfaces/ICategoria';
import { toast, Toaster } from 'react-hot-toast';
import Folder from '../../assets/editarCategoria/Folder.png'

function EditarCategoria() {
  const navigate = useNavigate();
  const  {id } = useParams<{ id?: string }>();

  // Estados para armazenar os dados do formulário
  const [titulo, setTitulo] = useState<string>();
  const [horario, setHorario] = useState<string>();
  const [prioridade, setPrioridade] = useState<string>();


  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      navigate('/notfound');
      return;
    }
  
    const cat_id: number = parseInt(id, 10);

    const dadosUpdate: ICategoriaUpdate = {
      cat_titulo: titulo,
      cat_horario: horario,
      cat_prioridade: prioridade,
    };
    console.log(dadosUpdate)
    console.log(cat_id)
    try {
      const verificaCampoVazio = Object.values(dadosUpdate).some(
        (value) =>
          typeof value === "string" &&
          (value.trim() === "" || value.trim().length === 0)
      );

      if (verificaCampoVazio) {
        toast.error("Por favor, preencha todos os campos corretamente.");
        return;
      }

      const resultado = await updateCategoria(cat_id, dadosUpdate);
      if (resultado.success){
        toast.success(resultado.message);
        console.log('Categoria editada!')
      }
      
    } catch (error) {
      toast.error('Erro ao editar categoria');
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
          <img src={Folder} alt='test'/>
          <h1>Editar Categoria</h1>
        </div>
        <div className={styles.Container}>
          <form className={styles.conteudoform} onSubmit={handleSubmit}>
            <div className={styles.Dados1}>
              <label>
                <h3 id={styles.subtitle}>Novo título:</h3>
                <input
                  className=''
                  type="text"
                  value={titulo}
                  placeholder='Digite o novo título da categoria aqui'
                  onChange={e => setTitulo(e.target.value)}
                />
              </label>
              <label>
                <h3 id={styles.horario}>Novo horário:</h3>  
                <select id={styles.seletor} onChange={e => setHorario(e.target.value)} required>
                  <option disabled selected>Selecione um horário</option>
                  <option value="01:00:00">01:00:00</option>
                  <option value="02:00:00">02:00:00</option>
                  <option value="03:00:00">03:00:00</option>
                </select>
              </label>
              <label>
                <h3 id={styles.horario}>Nova prioridade:</h3>  
                <select id={styles.seletor} onChange={e => setPrioridade(e.target.value)} required>
                  <option disabled selected>Selecione a prioridade</option>
                  <option value="alta">Alta</option>
                  <option value="media">Média</option>
                  <option value="baixa">Baixa</option>
                </select>
              </label>
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.customButton}>Salvar</button>
              <button className={styles.voltar} onClick={() => navigate(`/listarcategorias`)}>Voltar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditarCategoria;
