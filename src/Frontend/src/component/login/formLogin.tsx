import React, {useEffect, useState} from 'react';
import logo from "./projeto9999.png"
import styles from './Login.module.css'
import {Link} from 'react-router-dom';
import { text } from 'stream/consumers';

const LoginForm = ({ tipoCadastro }: {tipoCadastro: string }) => {
  const [identificacao, setIdentificacao] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [type, setType] = useState('');

  const [formDataPadrao, setFormDataPadrao] = useState({
    email: '',
    senha: '',
    type: '',
  })

  useEffect(() => {
    switch (tipoCadastro) {
      case 'usuario':
        setIdentificacao('Email');
        setPlaceholder('Example@example.com');
        setType('email')
        break;
      case 'funcionario':
        setIdentificacao('CPF');
        setPlaceholder('00000000000');
        setType('text')
        break;
    }
  }, [tipoCadastro]);

  const handleChange = (e:any)=> {
    setFormDataPadrao({e.target.name: e.target.value });
  }

  const handleSubmit = async (e:any) => {
      e.preventDefault();
      try {
          const resultado = await CadastroClienteFunc(formData)
          if (resultado.success) {
              setErro('')
          }
          toast.success('Cadastro concluído')
          
      }
      catch (error:any) {
          setErro(error.message)
      }
  }
  return ( 
    <div className={styles.conteudo}>
      <form onSubmit={handleSubmit} method="POST" className={styles.conteudointerno}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.Labels}>
          <h1>Faça o seu Login</h1>
          <label htmlFor="label1">{identificacao}</label>
          <input type={type} name="email" id={styles.label1} value={formDataPadrao.email} placeholder={placeholder} onChange={handleChange} />
          <label htmlFor="label2">Senha</label>
          <input type={type} id={styles.label2} value={formDataPadrao.senha} placeholder="Insira sua senha" onChange={handleChange} />
          <button type="submit" className={styles.EntrarButton}>Entrar</button>
          <div className={styles.Title}>
            {tipoCadastro === 'usuario' && (
              <Link to="/loginadm">É funcionário? </Link>
              )}
            <Link to="/registro">Não tem uma conta? </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
