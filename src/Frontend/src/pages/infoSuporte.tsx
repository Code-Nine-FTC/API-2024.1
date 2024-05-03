import React, { useState, FormEvent } from 'react';
import styles from "../component/infoSuporte/InfoSuporte.module.css"
// import ImageComponent from '../component/imagemPerfil/imagemperfil';
import Sidebar from '../component/sidebar/sidebar';
import SalvarDadosFunc from '../functions/editarFunc'; // Importe a função de salvar dados

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
  const [editavel, setEditavel] = useState<boolean>(false); // Estado para controlar a edição dos campos

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const user: User = { nome, email, senha, cpf, telefone, tiposuport };
    try {
      // Chame a função para salvar os dados
      await SalvarDadosFunc(user);
      alert('Dados salvos com sucesso!');
    } catch (error) {
      alert('Erro ao salvar os dados. Por favor, tente novamente.');
    }
  };

  const handleEditar = () => {
    setEditavel(true); // Habilita a edição dos campos
  };

  return (
    <>
      <Sidebar/>
      <div className={styles.conteudo}>
        <div className={styles.titulo}>
          <h1>Editar Usuário</h1>
        </div>
        <div className={styles.Container}>
          <div className={styles.perfil}>
              {/* <ImageComponent nome={nome}/> */}
          </div>
          <form className={styles.conteudoform} onSubmit={handleSubmit}>
            <div className={styles.Dados1}>
              <label>
                <input className='' type="text" value={nome} placeholder='Altere seu nome' onChange={e => setNome(e.target.value)} disabled={!editavel} />
              </label>
              <label>
                <input type="email" value={email} placeholder='Altere seu e-mail' onChange={e => setEmail(e.target.value)} disabled={!editavel} />
              </label>
              <label>
                <input type="password" value={senha} placeholder='Altere sua senha' onChange={e => setSenha(e.target.value)} disabled={!editavel} />
              </label>
            </div>
            <div className={styles.Dados2}>
              <label>
                <input type="text" readOnly value={tiposuport} placeholder='Suporte' onChange={e => setTiposuport(e.target.value)} disabled={!editavel} />
              </label>
              <label>
                <input type="cpf" readOnly value={cpf} placeholder={cpf} onChange={e => setCPF(e.target.value)} disabled={!editavel} />
              </label>
              <label>
                <input type="tel" value={telefone} placeholder='Altere seu número de telefone' onChange={e => setTelefone(e.target.value)} disabled={!editavel} />
              </label>
            </div>
            <button type="submit" disabled={!editavel}>Salvar</button>
          </form>
          <div>
            <div id={styles.Editar} onClick={handleEditar}> 
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
