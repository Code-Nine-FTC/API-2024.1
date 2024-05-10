import React, { useState, FormEvent, useEffect } from 'react';
import styles from "../../component/infoCliente/InfoCliente.module.css"
import ImageComponent from '../../component/imagemperfil/imagemperfil';
import Sidebar from '../../component/sidebar/sidebar';
import updateCliente from '../../functions/Editar/updateClienteFunc';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../services/auth';

const EditarCliente: React.FC = () => {
  const navigate = useNavigate();
  const [cli_nome, setNome] = useState<string>();
  const [cli_email, setEmail] = useState<string>();
  const [cli_senha, setSenha] = useState<string>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { cli_email, cli_nome, cli_senha};
    try {
      const token = getToken(); // Obtenha o token JWT do localStorage
      if (token) {
        await updateCliente(user);
        toast.success('Alteração concluída');
      }
    } catch (error) {
      console.log(`Erro ao editar Cliente`, error);
    }
  };

  return (
    <>
      <div><Toaster 
          position="top-center"
          reverseOrder={false}/>
      </div>
      <Sidebar/>
      <div className={styles.conteudo}>
      <div className={styles.titulo}>
        <h1>Minha Conta</h1>
      </div>
      <div className={styles.Container}>
        <div className={styles.perfil}>
          <ImageComponent/>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.Dados}>
            <label>
              <h3 id={styles.subtitle}>Altere seu nome:</h3>
              <input className='' type="text" value={cli_nome} placeholder='Altere seu nome' onChange={e => setNome(e.target.value)} />
            </label>
            <label>
            <h3 id={styles.subtitle}>Altere seu E-mail:</h3>
              <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  placeholder='Altere seu e-mail' onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
            <h3 id={styles.subtitle}>Altere sua senha:</h3>
              <input type="password" value={cli_senha} placeholder='Altere sua senha' onChange={e => setSenha(e.target.value)} />
            </label>
          </div>
          <div className={styles.button}>
          <button type="submit" id={styles.Editar}>
            Salvar
          </button>
          </div>
        </form>
        <button className={styles.voltar} onClick={() => navigate(`/visualizarCliente/`)}>Voltar</button>
        </div>
      </div>
    </>
  );
}

export default EditarCliente;
