import React from 'react';
import logo from "./projeto9999.png"
import styles from './Login.module.css'
import { Link } from 'react-router-dom';

function LoginForm() {
  return ( 
    <div className={styles.conteudo}>
      <form className={styles.conteudointerno}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.Labels}>
          <h1>Faça o seu Login</h1>
          <label htmlFor="label1">CPF</label>
          <input type="text" id={styles.label1} placeholder="000.000.000-00" />
          <label htmlFor="label2">Senha</label>
          <input type="password" id={styles.label2} placeholder="Insira sua senha" />
          <button type="submit" className={styles.EntrarButton}>Entrar</button>
          <Link to='/login'><div className={styles.Title}>Voltar→</div></Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
