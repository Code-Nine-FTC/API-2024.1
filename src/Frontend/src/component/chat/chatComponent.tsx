import styles from "./Chat.module.css"
import Mensagem from './mensagensComponent'
import BuscarMensagens from "../../functions/Chat/buscarMensagensFunc"
import { IMensagemView } from "../../functions/Chat/IMensagem";
import { useState, useEffect } from "react";

const ChatComponent = ({ id }: { id: number })=> {
    const [mensagens, setMensagens] = useState<IMensagemView[]>([]);
    // useEffect(()=>{
    //         const fetchMensagem = async () =>{
    //             try {
    //                 const resultado = await BuscarMensagens(id);
    //                 if (resultado && resultado.mensagem) {
    //                     setMensagens(resultado.mensagem);
    //                     console.log(`Mensagens encontradas:`, resultado.mensagem);
    //                 } else {
    //                     console.log(`Mensagem não encontrada.`);
    //                 }
    //             } catch (error) {
    //                 console.error("Erro ao encontrar Mensagens:", error);
    //             }
    //         } 
    //          fetchMensagem()
    //     },[])
    return (
        <div className={styles.campoMensagens}>
            {mensagens.map((mensagem) => (
                <div className={styles.funcionarioContainer} key={mensagem.resp_id}>
                    {/* Renderize o componente de mensagem (substitua 'Mensagem' pelo componente correto) */}
                    <Mensagem mensagem={mensagem} />
                </div>
            ))}
        </div>
    );
 };



export default ChatComponent