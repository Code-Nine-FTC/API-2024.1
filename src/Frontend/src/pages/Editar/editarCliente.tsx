import React, { useState, FormEvent } from 'react';
import styles from "../../component/infoCliente/InfoCliente.module.css"
import ImageComponent from '../../component/imagemperfil/imagemperfil';
import Sidebar from '../../component/sidebar/sidebar';
import updateCliente from '../../functions/Editar/updateClienteFunc';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Editinfocli: React.FC = () => {
  const navigate = useNavigate();
  const [cli_nome, setNome] = useState<string>('');
  const [cli_email, setEmail] = useState<string>('');
  const [cli_senha, setSenha] = useState<string>('');
  const id = localStorage.getItem('id') || ''
  const token = localStorage.getItem('token')

  const cli_id: number = parseInt(id, 10);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { cli_nome, cli_email, cli_senha };
    console.log(user);
    try {
      const clienteUpdate = await updateCliente(cli_id, user, token);
      toast.success('Alteração concluída')
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
            Editar Perfil
          </button>
          </div>
        </form>
        <button className={styles.voltar} onClick={() => navigate(`/`)}>Voltar</button>
        </div>
      </div>
    </>
  );
}

export default Editinfocli;
