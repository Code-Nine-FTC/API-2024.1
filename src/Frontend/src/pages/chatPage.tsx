import ChatComponent from "../component/chat/chatComponent"
import EnviarMensagem from "../component/chat/enviarMensagemComponent"
import HeaderChat from "../component/chat/headerChatComponent"
import Sidebar from "../component/sidebar/sidebar"
import styles from "../component/chat/Chat.module.css"
import { useParams } from "react-router-dom"
import BuscarChamado from "../functions/Chat/buscarChamadoFunc"
import { getNivelAcesso } from "../services/auth"
import IChamadoView from "../functions/Chat/IChamado"
import { useState, useEffect } from "react"

const ChatPage = () => {
    const id = 1 as number;
    const userTipo = getNivelAcesso();
    const [chamado, setChamado]= useState<any>(null)
    useEffect(()=>{
    const fetchCliente = async () =>{
        try {
            const resultado = await BuscarChamado(id);
            if (resultado && resultado.chamado) {
                setChamado(resultado.chamado);
                // console.log(`Chamado encontrado:`, resultado.chamado);
            } else {
                console.log(`Chamado não encontrado.`);
            }
        } catch (error) {
            console.error("Erro ao encontrar Chamado:", error);
        }
    } 
     fetchCliente()
},[id])
    useEffect(() => {
        console.log('Consolos fodas')
        console.log(chamado);
    }, [chamado]);
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