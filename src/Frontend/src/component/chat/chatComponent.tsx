import styles from "./Chat.module.css"
import Mensagem from './mensagensComponent'
import BuscarMensagens from "../../functions/Chat/buscarMensagensFunc"
import { IMensagemView } from "../../functions/Chat/IMensagem";
import { useState, useEffect } from "react";

const ChatComponent = ({ id }: { id: number })=> {
    const [mensagens, setMensagens] = useState<IMensagemView[]>([]);
    useEffect(()=>{
            const fetchMensagem = async () =>{
                try {
                    const resultado = await BuscarMensagens(id);
                    if (resultado && resultado.mensagem) {
                        if (Array.isArray(resultado.mensagem)) {
                            setMensagens(resultado.mensagem);
                        } else {
                            setMensagens([]);
                        }
                        // setMensagens(resultado.mensagem);
                        console.log(`Mensagens encontradas:`, resultado.mensagem);
                    } else {
                        console.log(`Mensagem não encontrada.`);
                    }
                } catch (error) {
                    console.error("Erro ao encontrar Mensagens:", error);
                }
            } 
             fetchMensagem()
        },[id])
        useEffect(() => {
            console.log('mensagens adicionadas')
            console.log(mensagens);
        }, [mensagens]);
    return (
        <div className={styles.campoMensagens}>
            {mensagens.map((mensagem) => (
                <div className={styles.funcionarioContainer} key={mensagem.resp_id}>
                    <Mensagem mensagem={mensagem} />
                </div>
            ))}
        </div>
    );
 };



export default ChatComponent