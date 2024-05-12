import React from 'react';
import styles from '../component/loginadm/Login.module.css'
import LoginForm from '../../component/login/formLogin';

function LoginAdmPage() {
  return (
    <main>
      <LoginForm tipoCadastro={'funcionario'}/>
    </main>
  );
}

export default LoginAdmPage;
