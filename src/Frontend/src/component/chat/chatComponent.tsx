import styles from "./Chat.module.css"
import Mensagem from './mensagens'

const ChatComponent = () => {

    return (
        <>
        <div className={styles.campoMensagens}>
            <Mensagem/>
            <Mensagem/>
            <Mensagem/>

        </div>
        </>
    )
}

export default ChatComponent