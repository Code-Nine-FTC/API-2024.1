import ChatComponent from "../component/chat/chatComponent"
import EnviarMensagem from "../component/chat/enviarMensagemComponent"
import HeaderChat from "../component/chat/headerChatComponent"
import Sidebar from "../component/sidebar/sidebar"
import styles from "../component/chat/Chat.module.css"
import { useParams } from "react-router-dom"
import BuscarChamado from "../functions/Chat/buscarChamadoFunc"
import { getNivelAcesso } from "../services/auth"
import IChamadoViewMensagem from "../functions/Tickets/interface/iChamado"
import { useState, useEffect } from "react"

const ChatPage = () => {
    const id = Number(useParams<{id: string}>().id) || 0;
    const userTipo = getNivelAcesso();
    const [chamado, setChamado]= useState<any>(null)
    useEffect(()=>{
    const fetchCliente = async () =>{
        try {
            const resultado = await BuscarChamado(id);
            if (resultado && resultado.chamado) {
                setChamado(resultado.chamado);
            } else {
                console.log(`Chamado não encontrado.`);
            }
        } catch (error) {
            console.error("Erro ao encontrar Chamado:", error);
        }
    } 
     fetchCliente()
},[id])
    return (
        <>
        <Sidebar/>
        <div className={styles.chatContent}>
            {chamado && (
                <HeaderChat id={id} chamado={chamado as IChamadoViewMensagem} />            
                )}
            <ChatComponent id={id}/>
            {userTipo !== 'administrador' &&(
                <EnviarMensagem id={id} />
            )}
        </div>
        </>
    )
}

export default ChatPage