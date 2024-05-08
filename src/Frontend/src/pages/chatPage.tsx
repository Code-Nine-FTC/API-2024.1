import ChatComponent from "../component/chat/chatComponent"
import EnviarMensagem from "../component/chat/enviarMensagemComponent"
import HeaderChat from "../component/chat/headerChatComponent"
import Sidebar from "../component/sidebar/sidebar"
import styles from "../component/chat/Chat.module.css"


const ChatPage = () => {
    const nivel = localStorage.getItem('nivel')

    if (nivel === 'administrador') {

    }
    return (
        <>
        <Sidebar/>
        <div className={styles.chatContent}>
            <HeaderChat/>
            <ChatComponent/>
            {nivel !== 'administrador' &&(
                <EnviarMensagem/>
            )}
        </div>
        </>
    )
}

export default ChatPage