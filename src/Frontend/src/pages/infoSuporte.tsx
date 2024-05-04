import React, { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import getUserData from '../functions/getUser'; 
import styles from "../component/infoSuporte/InfoSuporte.module.css";
import ImageComponent from '../component/imagemperfil/imagemperfil';
import Sidebar from '../component/sidebar/sidebar';
import axios from 'axios';
import { rotaBase } from '../functions/rotaBase';
import { IFuncionarioView } from '../../../Backend/src/interfaces/IFuncionario';

interface User {
  func_id: string;
  func_nome: string;
  func_email: string;
  func_senha: string;
  func_tiposuport: string;
  func_cpf: string;
  func_telefone: string;
}

const Editinfosuport: React.FC = () => {
  const token = localStorage.getItem('token')
  const { funcionarioId } = useParams<{ funcionarioId: string }>(); 
  const [user, setUser] = useState<User>({
    func_id:'',
    func_nome: '',
    func_email: '',
    func_senha: '',
    func_tiposuport: '',
    func_cpf: '',
    func_telefone: ''
    
  });
  const [editavel, setEditavel] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const response = await axios.get(`${rotaBase}/viewFuncionario`, { 
          data: { func_id: funcionarioId },
          headers: {
            Authorization: `Bearer ${token}`
        } // Enviar o func_id no corpo da requisição
        });
        setUser({
          func_id: response.data.funcionario.func_id,
          func_nome: response.data.funcionario.func_nome,
          func_email: response.data.funcionario.func_email,
          func_senha: response.data.funcionario.func_senha,
          func_tiposuport: response.data.funcionario.func_tiposuport,
          func_cpf: response.data.funcionario.func_cpf,
          func_telefone: response.data.funcionario.func_telefone
        });
        setLoading(false);
      } catch (error) {
        setError('Erro ao salvar os dados');
        setLoading(false);
      }
    };
  
    carregarDadosUsuario();
  }, [funcionarioId]);
  
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await salvarDadosNoBanco(user);
      alert('Dados salvos com sucesso!');
    } catch (error) {
      alert('Erro ao salvar os dados do usuário. Por favor, tente novamente.');
    }
  };

  const handleEditar = () => {
    setEditavel(true);
  };

  const salvarDadosNoBanco = async (userData: User) => {
    try {
      await axios.put(`/updateFuncionario${rotaBase}`, userData);
    } catch (error) {
      throw new Error('Erro ao salvar dados no banco de dados');
    }
  };

  return (
    <>
      <Sidebar />
      <div className={styles.conteudo}>
        <div className={styles.titulo}>
          <h1>Editar Usuário</h1>
        </div>
        <div className={styles.Container}>
          <div className={styles.perfil}>
              <ImageComponent nome={user.func_nome}/>
          </div>
          <form className={styles.conteudoform} onSubmit={handleSubmit}>
            <div className={styles.Dados1}>
              <label>
              <input type="text" value={user.func_nome} onChange={e => setUser({ ...user, func_nome: e.target.value })} disabled={!editavel} />

              </label>
              <label>
                <input type="email" value={user.func_email} placeholder='Altere seu e-mail' onChange={e => setUser({ ...user, func_email: e.target.value })} disabled={!editavel} />
              </label>
              <label>
                <input type="password" value={user.func_senha} placeholder='Altere sua senha' onChange={e => setUser({ ...user, func_senha: e.target.value })} disabled={!editavel} />
              </label>
            </div>
            <div className={styles.Dados2}>
              <label>
                <input type="text" readOnly value={user.func_tiposuport} placeholder='Suporte' disabled={!editavel} />
              </label>
              <label>
                <input type="text" readOnly value={user.func_cpf} placeholder='CPF' disabled={!editavel} />
              </label>
              <label>
                <input type="tel" value={user.func_telefone} placeholder='Altere seu número de telefone' onChange={e => setUser({ ...user, func_telefone: e.target.value })} disabled={!editavel} />
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
};

export default Editinfosuport;
