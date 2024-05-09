import styles from "./Chat.module.css"
import Mensagem from './mensagensComponent'

const ChatComponent = () => {

    return (
        <>
        <div className={styles.campoMensagens}>
            <Mensagem/>
        </div>
        </>
    )
}

export default ChatComponent