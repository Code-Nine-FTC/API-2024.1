import logo from '../component/registro/Man creating a website.png'
import styles from '../component/registro/Registro.module.css'


const RegistroSup = () => {
    return (
        <>
        <section className={styles.container}>
            <section className={styles.bemvindo}>
                <img src={logo} className={styles.logo} alt="logo" />
            </section>
            <section className={styles.form}>
                <h1 className={styles.title}>Criar Nova Conta</h1><br></br>
                <form action ='' method="POST">
                    
                    <label>Nome Completo:</label><br></br>
                    <input type="text" id='nome' name="nome" placeholder='Digite seu nome aqui ' required></input><br></br>
                    <br></br>
                    <label>Seu E-mail:</label><br></br>
                    <input type="email" id="email" name="email" placeholder='Example@example.com' required></input><br></br>
                    <br></br>
                    <label>Seu CPF:</label><br></br>
                    <input type="text" id="cpf" name="cpf" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" placeholder="000.000.000-00 " required></input><br></br>
                    <br></br>
                    <label>Horário de Atendimento :</label><br></br>
                    <select className={styles.seletor} required>
                        <option disabled selected>Selecione um horário</option>
                        <option value="valor1">8:00 -- 16:00</option>
                        <option value="valor2">10:00 -- 18:00 </option>
                        <option value="valor3">13:00 -- 21:00</option>
                    </select>
                    <br></br>
                    <br></br>
                    <label>Senha:</label><br></br>
                    <input type='password' id='senha' name="senha" placeholder='Digite até 8 caracteres ' required></input><br></br>
                    <br></br>
                    <label>Confirmar Senha:</label><br></br>
                    <input type="password" id="confirmarsenha" name="senha" placeholder='Confirme sua senha' required></input><br></br>
                    <br></br>
                    <div className={styles.button}>
                        <div id={styles.Editar}>
                            Adicionar Suporte
                        </div>
                    </div>
                    <div className={styles.Title}>Voltar</div>
                </form>
            </section>
        </section>
        </>
    )
}

export default RegistroSup