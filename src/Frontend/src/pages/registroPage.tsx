import React, { useState } from 'react';
import styles from '../component/registro/Registro.module.css';
import CadastroClienteFunc from '../functions/Cadastro/cadastroClienteFunc';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Registro = () => {

    const [formDataSenha, setFormData] = useState({
        cli_email: '',
        cli_nome: '',
        cli_cpf: '',
        cli_senha: '',
        senha2: '',
    })
    const [erro, setErro] = useState ('')

    const navigate = useNavigate()
    
    const handleCpfChange = (event: any) => {
        const cpfFinal = event.target.value.replace(/\D/g, '')
        setFormData({ ...formDataSenha, cli_cpf: cpfFinal});
    }

    const cpfFormatado = formDataSenha.cli_cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

    const handleChange = (e:any)=> {
        setFormData({ ...formDataSenha, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (formDataSenha.cli_senha !== formDataSenha.senha2) {
            setErro('Senhas não coincidem')
        }
        else{
            const { senha2, ...formData } = formDataSenha
            try {
                const verificaCampoVazio = Object.values(formDataSenha).some(
                    (value) =>
                      typeof value === "string" &&
                      (value.trim() === "" || value.trim().length === 0)
                  );
            
                  if (verificaCampoVazio) {
                    toast.error("Por favor, preencha todos os campos corretamente.");
                    return;
                  }
                const resultado = await CadastroClienteFunc(formData)
                if (resultado.success) {
                    setErro('')
                    Swal.fire({
                        title: "Registrado!",
                        text: "Sua conta foi criada com sucesso!",
                        icon: "success"
                      });
                    navigate('/login')
                }
            }
            catch (error:any) {
                let errorMessage = error.message || 'Erro ao iniciar o chamado. Por favor, tente novamente mais tarde.';
                setErro(errorMessage)
            }
        }
    }
    return (
        <>
        <div><Toaster
        position="top-center"
        reverseOrder={false}/>
        </div>
        <section className={styles.container}>
            <section className={styles.bemvindo}>
                <h1 className={styles.title}>Bem-vindo !</h1><br></br>
                <p className={styles.texto}>Já tem uma conta ? Faça login no sistema para obter o suporte necessário. </p>
                <Link to='/login'>
                     <div className={styles.button}><br></br>
                        <div id={styles.Editar2}>
                        Entrar !
                        </div>
                    </div>
                </Link>    
            </section>
            <section className={styles.form}>
                <h1 className={styles.title}>Criar Nova Conta</h1><br></br>
                <form onSubmit={handleSubmit} method="POST">
                    
                    <label>Seu E-mail:</label>
                    <input type="email" id="email" name="cli_email" value={formDataSenha.cli_email} placeholder='Example@example.com' onChange={handleChange} required></input><br></br>
                    <br></br>
                    <label>Nome Completo:</label>
                    <input type="text" id='nome' name="cli_nome" value={formDataSenha.cli_nome} placeholder='Digite seu nome aqui ' onChange={handleChange} required></input><br></br>
                    <br></br>
                    <label>Seu CPF:</label>
                    <InputMask mask="999.999.999-99" type="text" id="cpf" name="cli_cpf" onChange={handleCpfChange} placeholder="00000000000" required></InputMask><br></br>
                    <br></br>
                    <label>Senha:</label>
                    <input type='password' id='senha' name="cli_senha" value={formDataSenha.cli_senha} placeholder='Digite até 8 caracteres ' onChange={handleChange} required></input><br></br>
                    <br></br>
                    <label>Confirmar Senha:</label>
                    <input type="password" id="confirmarsenha" name="senha2" value={formDataSenha.senha2} placeholder='Confirme sua senha' onChange={handleChange} required></input><br></br>
                    <br></br>
                    <div className={styles.button}>
                        <button type="submit" id={styles.Editar}>
                            Cadastrar-se
                        </button>
                    </div>
                    <div className={styles.Title}>
                        <Link to='/login'> Voltar → </Link>
                    </div>

                    {erro && <p style={{ color: 'red', textAlign: 'center', marginTop: '4%'}}>{erro}</p>}
                </form>
            </section>
        </section>
        </>
    )
}

export default Registro;