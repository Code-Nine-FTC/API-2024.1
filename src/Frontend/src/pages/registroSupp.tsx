import React, { useState, useEffect } from 'react'
import logo from '../component/registro/log.png'
import styles from '../component/registro/Registro.module.css'
import CadastroFuncionarioFunc from '../functions/Cadastro/cadastroFuncionarioFunc';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';


const RegistroSup = () => {
    const navigate = useNavigate()

    const [formDataSenha, setFormData] = useState({
        func_nome: '',
        func_cpf: '',
        func_email: '',
        func_senha: '',
        func_expediente_inicio: '',
        func_expediente_final: '',
        func_is_admin: false,
        senha2: ''
    });

    const [erro, setErro] = useState('')

    const selecionarHorario = (event: any) => {
        const horario = event.target.value
        switch (horario) {
            case 'valor1':
                formDataSenha.func_expediente_inicio = '08:00'
                formDataSenha.func_expediente_final = '16:00'
                return
            case 'valor2':
                formDataSenha.func_expediente_inicio = '10:00'
                formDataSenha.func_expediente_final = '18:00'
                return
            case 'valor3':
                formDataSenha.func_expediente_inicio = '13:00'
                formDataSenha.func_expediente_final = '21:00'
                return
        }
    }

    const handleCpfChange = (event: any) => {
        const cpfFinal = event.target.value.replace(/\D/g, '')
        setFormData({ ...formDataSenha, func_cpf: cpfFinal });
    }

    const cpfFormatado = formDataSenha.func_cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

    const handleChange = (e: any) => {
        setFormData({ ...formDataSenha, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formDataSenha.func_senha !== formDataSenha.senha2) {
            setErro('Senhas não coincidem')
        }
        else {
            const { senha2, ...formData } = formDataSenha
            try {
                const resultado = await CadastroFuncionarioFunc(formData)
                if (resultado.success) {
                    setErro('')
                    toast.success('Cadastro concluído')
                    const timeoutId = setTimeout(() => {
                        console.log('Navigating...');
                        navigate('/visualizarTodosFuncionarios')
                    }, 10000);   
                    return () => clearTimeout(timeoutId);
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
                reverseOrder={false} />
            </div>
            <section className={styles.container}>
                <section className={styles.bemvindo}>
                    <img src={logo} className={styles.logo} alt="logo" />
                </section>
                <section className={styles.form}>
                    <h1 className={styles.title}>Criar Nova Conta</h1><br></br>
                    <form onSubmit={handleSubmit} method="POST">

                        <label>Nome Completo:</label>
                        <input type="text" id='nome' name="func_nome" value={formDataSenha.func_nome} placeholder='Digite seu nome aqui ' onChange={handleChange} required></input><br></br>
                        <br></br>
                        <label>Seu E-mail:</label>
                        <input type="email" id="email" name="func_email" value={formDataSenha.func_email} placeholder='Example@example.com' onChange={handleChange} required></input><br></br>
                        <br></br>
                        <label>Seu CPF:</label>
                        <InputMask mask="999.999.999-99" type="text" id="cpf" name="func_cpf" onChange={handleCpfChange} placeholder="000.000.000-00 " required></InputMask><br></br>
                        <br></br>
                        <label>Horário de Atendimento :</label>
                        <select className={styles.seletor} onChange={selecionarHorario} required>
                            <option disabled selected>Selecione um horário</option>
                            <option value="valor1">8:00 -- 16:00</option>
                            <option value="valor2">10:00 -- 18:00 </option>
                            <option value="valor3">13:00 -- 21:00</option>
                        </select>
                        <br></br>
                        <br></br>
                        <label>Senha:</label>
                        <input type='password' id='senha' name="func_senha" value={formDataSenha.func_senha} placeholder='Digite até 8 caracteres ' onChange={handleChange} required></input><br></br>
                        <br></br>
                        <label>Confirmar Senha:</label>
                        <input type="password" id="confirmarsenha" name="senha2" value={formDataSenha.senha2} placeholder='Confirme sua senha' onChange={handleChange} required></input><br></br>
                        <br></br>
                        <div className={styles.button}>
                            <button type='submit' id={styles.Editar} >
                                Adicionar Suporte
                            </button>
                            <div className={styles.Title}>
                                <Link to='/visualizarTodosFuncionarios'> Voltar → </Link>
                            </div>
                        </div>

                        {erro && <p style={{ color: 'red', textAlign: 'center', marginTop: '3%' }}>{erro}</p>}
                    </form>
                </section>
            </section>
        </>
    )
}

export default RegistroSup