import React from 'react';
import logo from "./projeto9999.png"
import styles from './Login.module.css'

function LoginForm() {
  return ( 
    <div className={styles.conteudo}>
      <form className={styles.conteudointerno}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.Labels}>
          <h1>Faça o seu Login</h1>
          <label htmlFor="label1">CPF</label>
          <input type="text" id={styles.label1} placeholder="Insira seu CPF" />
          <label htmlFor="label2">Senha</label>
          <input type="text" id={styles.label2} placeholder="Insira sua senha" />
          <button type="submit" className={styles.EntrarButton}>Entrar</button>
          <div className={styles.Title}>Voltar</div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
