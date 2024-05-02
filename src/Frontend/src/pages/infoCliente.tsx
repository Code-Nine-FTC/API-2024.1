import React, { useState, FormEvent } from 'react';
import styles from "../component/infoCliente/InfoCliente.module.css"
// import ImageComponent from '../component/imagemPerfil/imagemperfil';
import Sidebar from '../component/sidebar/sidebar';
const userLogado = 'user'

interface User {
  nome: string;
  email: string;
  senha: string;
}

const Editinfocli: React.FC = () => {
  const [nome, setNome] = useState<string>('Yuri');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const user: User = { nome, email, senha };
    console.log(user);
  };

  return (
    <>
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
              <input className='' type="text" value={nome} placeholder='Altere seu nome' onChange={e => setNome(e.target.value)} />
            </label>
            <label>
              <input type="email" required value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  placeholder='Altere seu e-mail' onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
              <input type="password" value={senha} placeholder='Altere sua senha' onChange={e => setSenha(e.target.value)} />
            </label>
          </div>
        </form>
        <div className={styles.button}>
          <div id={styles.Editar}>
            Editar Perfil
          </div>
          <div id={styles.Deletar}>
            Deletar Conta
          </div> 
        </div>
      </div>
      </div>
    </>
  );
}

export default Editinfocli;
