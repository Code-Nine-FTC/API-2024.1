import ChatComponent from "../component/chat/chatComponent"
import EnviarMensagem from "../component/chat/enviarMensagemComponent"
import HeaderChat from "../component/chat/headerChatComponent"
import Sidebar from "../component/sidebar/sidebar"
import styles from "../component/chat/Chat.module.css"
import { useParams } from "react-router-dom"
import BuscarChamado from "../functions/Chat/buscarChamadoFunc"
import { getNivelAcesso } from "../services/auth"
import IChamadoView from "../functions/Chat/IChamado"

const ChatPage = () => {
    // const { id } = useParams<{ id?: string }>();
    const userTipo = getNivelAcesso();
    const id = 1
    const chamado = BuscarChamado(id)
    return (
        <>
        <Sidebar/>
        <div className={styles.chatContent}>
            {chamado && (
                <HeaderChat id={id} chamado={chamado as IChamadoView} />            
                )}
            <ChatComponent id={id}/>
            {userTipo !== 'administrador' &&(
                <EnviarMensagem/>
            )}
        </div>
        </>
    )
}

export default ChatPage