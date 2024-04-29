import styles from '../component/registro/Registro.module.css'


const Registro = () => {
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
                <form action ='' method="POST">
                    
                    <label>Nome Completo:</label>
                    <input type="text" id='nome' name="nome" placeholder='Digite seu nome aqui ' required></input><br></br>
                    <br></br>
                    <label>Seu E-mail:</label>
                    <input type="email" id="email" name="email" placeholder='Example@example.com' required></input><br></br>
                    <br></br>
                    <label>Seu CPF:</label>
                    <input type="text" id="cpf" name="cpf" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" placeholder="000.000.000-00 " required></input><br></br>
                    <br></br>
                    <label>Senha:</label>
                    <input type='password' id='senha' name="senha" placeholder='Digite até 8 caracteres ' required></input><br></br>
                    <br></br>
                    <label>Confirmar Senha:</label>
                    <input type="password" id="confirmarsenha" name="senha" placeholder='Confirme sua senha' required></input><br></br>
                    <br></br>
                    <div className={styles.button}>
                        <div id={styles.Editar}>
                            Cadastrar-se
                        </div>
                    </div>
                </form>
            </section>
        </section>
        </>
    )
}

export default Registro