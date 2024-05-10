import ChatComponent from "../component/chat/chatComponent"
import EnviarMensagem from "../component/chat/enviarMensagemComponent"
import HeaderChat from "../component/chat/headerChatComponent"
import Sidebar from "../component/sidebar/sidebar"
import styles from "../component/chat/Chat.module.css"
import { useParams } from "react-router-dom"
import BuscarChamado from "../functions/Chat/buscarChamadoFunc"


const ChatPage = () => {
    // const { id } = useParams<{ id?: string }>();
    const id = 1
    const nivel = localStorage.getItem('nivel')
    const chamado = BuscarChamado(id)
    return (
        <>
        <Sidebar/>
        <div className={styles.chatContent}>
            <HeaderChat id={chamado.cha_id} atendente={chamado.func_id} categoria={chamado.cha_topico_chamado} cliente ={chamado.cli_id}/>
            <ChatComponent/>
            {nivel !== 'administrador' &&(
                <EnviarMensagem/>
            )}
        </div>
        </>
    )
}

export default ChatPage