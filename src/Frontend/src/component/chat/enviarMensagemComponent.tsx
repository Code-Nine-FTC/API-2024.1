import styles from './Chat.module.css'
import enviarIcon from '../../assets/chat/sendicon.svg'

const EnviarMensagem = () => {
    return (
        <div className={styles.enviarMensagem}>
            <form method="POST" className={styles.inputMensagem}>
                <input type="text" name="mensagem" value="" placeholder="Mensagem"/>
                <button className={styles.enviarButton} type="submit">
                    <img src={enviarIcon} className="enviarIcon" alt="Enviar Mensagem"/>
                </button>
            </form>
        </div>
    )
}

export default EnviarMensagem