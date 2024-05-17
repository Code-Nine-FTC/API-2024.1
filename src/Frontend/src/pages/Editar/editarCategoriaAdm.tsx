import React, { useState, useEffect, FormEvent } from 'react';
import styles from "../../component/infoSuporte/InfoSuporte.module.css";
import Sidebar from '../../component/sidebar/sidebar';
import updateCategoria from '../../functions/categoria/editarCategoriaAdm';
import { useNavigate, useParams } from 'react-router-dom';
import { ICategoriaUpdate } from '../../../../Backend/src/interfaces/ICategoria';
import { toast, Toaster } from 'react-hot-toast';

function EditarCategoria() {
  const navigate = useNavigate();
  const  {id } = useParams<{ id?: string }>();

  // Estados para armazenar os dados do formulário
  const [titulo, setTitulo] = useState<string>('');
  const [horario, setHorario] = useState<string>('');


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
      cat_horario: horario
    };
    console.log(dadosUpdate)
    console.log(cat_id)
    try {
      const resultado = await updateCategoria(cat_id, dadosUpdate);
      if (resultado.success){
        alert('Chamado Editado!')
        toast.success(resultado.message);
        console.log('Deu certo!')
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
                  <option value="1">8:00 -- 16:00</option>
                  <option value="2">10:00 -- 18:00</option>
                  <option value="3">13:00 -- 21:00</option>
                </select>
              </label>
            </div>
            <button type="submit" className={styles.customButton}>Salvar</button>
            <button className={styles.voltar} onClick={() => navigate(`/visualizacategoria`)}>Voltar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditarCategoria;
