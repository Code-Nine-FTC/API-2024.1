import React from 'react';
import logo from "./projeto9999.png"
import '../login/Login.css'

function LoginForm() {
  return ( 
  <>
    <img src={logo} className="logo" alt="logo" />
      <form className="Content">
        <div className="Labels">
          <h1>Faça o seu Login</h1>
          <label htmlFor="label1">CPF</label>
          <input type="text" id="label1" placeholder="Insira seu CPF" />
          <label htmlFor="label2">Senha</label>
          <input type="text" id="label2" placeholder="Insira sua senha" />
          <button type="submit" className="EntrarButton">Entrar</button>
          <div className="Title">Voltar</div>
        </div>
      </form>
      
      </>

  );
}




export default LoginForm;
