import React from 'react';
import LoginForm from '../component/login/formLogin';
import styles from '../component/login/Login.module.css'
import { redirect } from 'react-router-dom';

function LoginPage() {
  // const token = localStorage.getItem('token')
  // console.log(token)
  // if (token !== ''){
  //   redirect('/')
  // }
  return (
    <main>
      <LoginForm tipoCadastro={'usuario'}/>
    </main>
  );
}




export default LoginPage;
