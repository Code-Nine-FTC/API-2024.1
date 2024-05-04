import React, { useState, FormEvent } from 'react';
import styles from "../../component/infoCliente/InfoCliente.module.css"
// import ImageComponent from '../component/imagemPerfil/imagemperfil';
import Sidebar from '../../component/sidebar/sidebar';
import updateCliente from '../../functions/Editar/updateClienteFunc';
import { toast, Toaster } from 'react-hot-toast';


const Editinfocli: React.FC = () => {
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
          {/* <ImageComponent nome={nome}/> */}
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.Dados}>
            <label>
              <input className='' type="text" value={cli_nome} placeholder='Altere seu nome' onChange={e => setNome(e.target.value)} />
            </label>
            <label>
              <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  placeholder='Altere seu e-mail' onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
              <input type="password" value={cli_senha} placeholder='Altere sua senha' onChange={e => setSenha(e.target.value)} />
            </label>
          </div>
          <div className={styles.button}>
          <button type="submit" id={styles.Editar}>
            Editar Perfil
          </button>
          </div>
        </form>
          <div id={styles.Deletar}>
            Deletar Conta
          </div> 
        </div>
      </div>
    </>
  );
}

export default Editinfocli;
