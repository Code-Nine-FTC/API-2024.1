import Sidebar from "../component/sidebar/sidebar"
import styles from '../component/envioticket/EnvioTicket.module.css'

const Ticket = () => {
    
    return(
    <>
        <Sidebar/>
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Envie sua solicitação</h1>
                <p>Não importa se for problema ou dúvida, responderemos em até 24hrs.</p>
                <br></br>
                <br></br>
                <hr className={styles.linha}></hr>   
            </header>
            <form className={styles.form}>
                <div>
                    <br></br>
                    <select className={styles.seletor} required>
                        <option disabled selected>Selecione o tópico desejado</option>
                        <option value="valor1">Rastreio de Pacote</option>
                        <option value="valor2">Perda do Código de Rastreio</option>
                        <option value="valor3">Outros</option>
                    </select>
                </div>
                <br></br>
                <div>
                    <br></br>
                    <input className={styles.seletor} type="text" id="campo1" name="campo1" maxLength={25} placeholder="Digite o título do assunto" required></input><br></br>
                </div>
                <br></br>
                <div>
                    <br></br>
                    <textarea className={styles.textarea} id="campo2" name="campo2" maxLength={1000} rows={4} placeholder="Descreva seu problema aqui..." required></textarea>
                </div>
                <br></br>
                <div>
                    <div id={styles.Editar}>
                        Cadastrar-se
                    </div>
                </div>
            </form>
        </div>
    
    </>
    )
}


export default Ticket