import React, { useState } from 'react';
import styles from '../component/registro/Registro.module.css';
import CadastroClienteFunc from '../functions/cadastroClienteFunc';

// <<<<<<< Updated upstream
// interface IClienteInput {
//   cli_email?: string;
//   cli_nome?: string;
//   cli_cpf?: string;
//   cli_senha?: string;

const Registro = () => {

    const [formDataSenha, setFormData] = useState({
        cli_email: '',
        cli_nome: '',
        cli_cpf: '',
        cli_senha: '',
        senha2: '',
    })
    const [erro, setErro] = useState ('')
    
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
        if (formDataSenha.cli_senha != formDataSenha.senha2) {
            setErro('Senhas não coincidem')
        }
        else{
            const { senha2, ...formData } = formDataSenha
            try {
                const resultado = await CadastroClienteFunc(formData)
                if (resultado.sucess) {
                    setErro('')
                }
                alert(`Cadastro realizado com sucesso`) 
            }
            catch (error) {
                setErro(error.message)
            }
        }
    }
    return (
        <>
        <section className={styles.container}>
            <section className={styles.bemvindo}>
                <h1 className={styles.title}>Bem-vindo !</h1><br></br>
                <p className={styles.texto}>Já tem uma conta ? Faça login no sistema para obter o suporte necessário. </p>
                <div className={styles.button}><br></br>
                 <div id={styles.Editar2}>
                 Entrar !
                </div>
                </div>
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
                    <input type="text" id="cpf" name="cli_cpf" value={cpfFormatado} onChange={handleCpfChange} placeholder="000.000.000-00 " required></input><br></br>
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

                    {erro && <p style={{ color: 'red' }}>{erro}</p>}
                </form>
            </section>
        </section>
        </>
    )

// const Registro: React.FC<IClienteInput> = ({ cli_nome = '', cli_email = '', cli_cpf = '', cli_senha = '' }) => {
//   const [nomeCliente, setNomeCliente] = useState(cli_nome);
//   const [emailCliente, setEmailCliente] = useState(cli_email);
//   const [cpfCliente, setCpfCliente] = useState(cli_cpf);
//   const [senhaCliente, setSenhaCliente] = useState(cli_senha);
//   const [error, setError] = useState<string>('');

//   const cadastrarCliente = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/cadastroCliente', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           cli_email: emailCliente,
//           cli_nome: nomeCliente,
//           cli_cpf: cpfCliente,
//           cli_senha: senhaCliente,
//         }),
//       });

      
//       if (response.ok) {
//         // Limpa o erro se o cadastro for bem-sucedido
//         setError('');
//         // Extrai os dados da resposta JSON
//         const data = await response.json();
//         // Exibe a mensagem retornada pelo servidor
//         alert(data.message);
//       } else {
//         // Captura o erro enviado pelo servidor
//         const errorData = await response.json();
//         // Atualiza o estado de erro com a mensagem recebida
//         setError(errorData.message);

//       }
//     } catch (error) {
//       console.error('Erro ao cadastrar', error);
//       // Define uma mensagem de erro genérica
//       setError('Erro ao cadastrar');
//     }
//   };

//   return (
//     <>
//       <section className={styles.container}>
//         <section className={styles.bemvindo}>
//           <h1 className={styles.title}>Bem-vindo !</h1>
//           <br />
//           <p className={styles.texto}>
//             Já tem uma conta ? Faça login no sistema para obter o suporte necessário.{' '}
//           </p>
//           <div className={styles.button}>
//             <br />
//             <div id={styles.Editar2}>Entrar !</div>
//           </div>
//         </section>
//         <section className={styles.form}>
//           <h1 className={styles.title}>Criar Nova Conta</h1>
//           <br />
//           <form method="POST">
//             <label htmlFor="cli_nome">Nome Completo:</label>
//             <input
//               type="text"
//               id="nome"
//               value={nomeCliente}
//               placeholder="Digite seu nome aqui "
//               required
//               onChange={(e) => setNomeCliente(e.target.value)}
//             ></input>
//             <br />
//             <br />
//             <label htmlFor="cli_email">Seu E-mail:</label>
//             <input
//               type="email"
//               id="email"
//               value={emailCliente}
//               placeholder="Example@example.com"
//               required
//               onChange={(e) => setEmailCliente(e.target.value)}
//             ></input>
//             <br />
//             <br />
//             <label htmlFor="cli_cpf">Seu CPF:</label>
//             <input
//               type="text"
//               id="cpf"
//               value={cpfCliente}
//               pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
//               placeholder="000.000.000-00 "
//               required
//               onChange={(e) => setCpfCliente(e.target.value)}
//             ></input>
//             <br />
//             <br />
//             <label htmlFor="cli_senha">Senha:</label>
//             <input
//               type="password"
//               id="senha"
//               name="senha"
//               value={senhaCliente}
//               placeholder="Digite até 8 caracteres "
//               required
//               onChange={(e) => setSenhaCliente(e.target.value)}  
//             ></input>
//             <br />
//             <br />
//             <div className={styles.button} onClick={cadastrarCliente} >
//               <div id={styles.Editar}>Cadastrar-se</div>
//             </div>
//           </form>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//         </section>
//       </section>
//     </>
//   );
// };
}

export default Registro;