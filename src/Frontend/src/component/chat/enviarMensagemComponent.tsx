import styles from './Chat.module.css'
import enviarIcon from '../../assets/chat/sendicon.svg'
import { useState } from 'react'

const EnviarMensagem = () => {

    const [mensagem, setMensagem] = useState();
    
    return (
        <div className={styles.enviarMensagem}>
            <form method="POST" className={styles.formMensagem}>
                <input type="text" name="mensagem" value="" placeholder="Mensagem"/>
                <button className={styles.enviarButton} type="submit">
                    <img src={enviarIcon} className="enviarIcon" alt="Enviar Mensagem"/>
                </button>
            </form>
        </div>
    )
}

export default EnviarMensagem