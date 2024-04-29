import React, { useState, FormEvent } from 'react';
import styles from "../component/infoSuporte/InfoSuporte.module.css"
import ImageComponent from '../component/imagemperfil/imagemperfil';
import Sidebar from '../component/sidebar/sidebar';
const userLogado = 'atendente'

interface User {
  nome: string;
  email: string;
  senha: string;
  tiposuport: string;
  cpf: string;
  telefone: string;
}

const Editinfosuport: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [tiposuport, setTiposuport] = useState<string>('');
  const [cpf, setCPF] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const user: User = { nome, email, senha, cpf, telefone, tiposuport };
    console.log(user);
  };
  

  return (
    <>
      <Sidebar userTipo={userLogado}/>
      <div className={styles.conteudo}>
        <div className={styles.titulo}>
          <h1>Editar Usuário</h1>
        </div>
        <div className={styles.Container}>
          <div className={styles.perfil}>
              <ImageComponent nome={nome}/>
          </div>
          <form className={styles.conteudoform} onSubmit={handleSubmit}>
            <div className={styles.Dados1}>
              <label>
                <input className='' type="text" value={nome} placeholder='Altere seu nome' onChange={e => setNome(e.target.value)} />
              </label>
              <label>
                <input type="email" value={email} placeholder='Altere seu e-mail' onChange={e => setEmail(e.target.value)} />
              </label>
              <label>
                <input type="password" value={senha} placeholder='Altere sua senha' onChange={e => setSenha(e.target.value)} />
              </label>
            </div>
            <div className={styles.Dados2}>
              <label>
                <input type="text" readOnly value={tiposuport} placeholder='Suporte' onChange={e => setTiposuport(e.target.value)} />
              </label>
              <label>
                <input type="cpf" readOnly value={cpf} placeholder={cpf} onChange={e => setCPF(e.target.value)} />
              </label>
              <label>
                <input type="tel" value={telefone} placeholder='Altere seu número de telefone' onChange={e => setTelefone(e.target.value)} />
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

export default Editinfosuport;
