import React from 'react';
import LoginAdmForm from '../component/loginadm/formAdm'
import styles from '../component/loginadm/Login.module.css'
import LoginForm from '../component/login/formLogin';

function LoginAdmPage() {
  return (
    <main>
      <LoginForm tipoCadastro={'funcionario'}/>
    </main>
  );
}

export default LoginAdmPage;
