import styles from "./Chat.module.css"
import Mensagem from './mensagensComponent'
import BuscarMensagens from "../../functions/Chat/buscarMensagensFunc"
import { IMensagemView } from "../../functions/Chat/IMensagem";
import { useState } from "react";

const ChatComponent = ({ id }: { id: number })=> {
    const mensagemBusca = BuscarMensagens(id)
    const [mensagens, setMensagens] = useState<IMensagemView[]>([]);
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