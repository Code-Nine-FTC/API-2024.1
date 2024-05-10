import styles from "./Chat.module.css"
import Mensagem from './mensagensComponent'

const ChatComponent = (id: number) => {
    const mensagens = BuscarMensagens(id)
    return (
        <>
        <div className={styles.campoMensagens}>
        {mensagens.map((mensagem) => (
            <div className={styles.funcionarioContainer} key={mensagem.resp_id}>
            <Mensagem/>
        )  
        </div>
        </>
    )
}

export default ChatComponent