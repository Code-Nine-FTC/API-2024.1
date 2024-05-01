import React, {useEffect, useState} from 'react';
import logo from "./projeto9999.png"
import styles from './Login.module.css'
import {Link, useHistory} from 'react-router-dom';
import {toast, Toaster} from 'react-hot-toast';
import LoginClienteFunc from '../../functions/loginClienteFunc';
import LoginFuncionarioFunc from '../../functions/loginFuncionarioFunc';

const LoginForm = ({ tipoCadastro }: {tipoCadastro: string }) => {
  const [identificacao, setIdentificacao] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [type, setType] = useState('');

  const [formDataPadrao, setFormDataPadrao] = useState({
    email: '',
    senha: '',
  })

  const [erro, setErro] = useState ('')

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

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormDataPadrao((prevFormDataPadrao) => ({
        ...prevFormDataPadrao,
        [name]: value,
    }));
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        switch (tipoCadastro) {
          case 'usuario':
            const formDataUser = {
              cli_email: tipoCadastro === 'usuario' ? formDataPadrao.email : '',
              cli_senha: tipoCadastro === 'usuario' ? formDataPadrao.senha : '',
            }
            const resultadoUsuario = await LoginClienteFunc(formDataUser);
            if (resultadoUsuario.success) {
              setErro('');
              toast.success('Login concluído');
              return <Redirect to="/" />
            }
            break;
          case 'funcionario':
            const formDataFunc = {
              func_cpf: tipoCadastro === 'funcionario' ? formDataPadrao.email : '',
              func_senha: tipoCadastro === 'funcionario' ? formDataPadrao.senha : ''
            }
            const resultadoFuncionario = await LoginFuncionarioFunc(formDataFunc);
            if (resultadoFuncionario.success) {
              setErro('');
              toast.success('Login concluído');
            }
            break;
        }
      } catch (error: any) {
        setErro(error.message);
      }
    };

  return ( 
    <>
    <div><Toaster
        position="top-center"
        reverseOrder={false}/>
        </div>
    <div className={styles.conteudo}>
      <form onSubmit={handleSubmit} method="POST" className={styles.conteudointerno}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.Labels}>
          <h1>Faça o seu Login</h1>
          <label htmlFor="label1">{identificacao}</label>
          <input type={type} name="email" id={styles.label1} value={formDataPadrao.email} placeholder={placeholder} onChange={handleChange} />
          <label htmlFor="label2">Senha</label>
          <input type="password" name="senha" id={styles.label2} value={formDataPadrao.senha} placeholder="Insira sua senha" onChange={handleChange} />
          <button type="submit" className={styles.EntrarButton}>Entrar</button>
          <div className={styles.Title}>
            {tipoCadastro === 'usuario' && (
              <Link to="/loginadm">É funcionário? </Link>
              )}
            <Link to="/registro">Não tem uma conta? </Link>
          </div>
          {erro && <p style={{ color: 'red', textAlign: 'center', marginTop: '4%', fontSize: '0.8em'}}>{erro}</p>}
        </div>
      </form>
    </div>
    </>
  );
}

export default LoginForm;
