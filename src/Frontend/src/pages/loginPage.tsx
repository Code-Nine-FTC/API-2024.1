import React from 'react';
import LoginForm from '../component/login/formLogin';
import styles from '../component/login/Login.module.css'
import { redirect } from 'react-router-dom';

function LoginPage() {
  return (
    <main>
      <LoginForm tipoCadastro={'usuario'}/>
    </main>
  );
}




export default LoginPage;
