import styles from './Chat.module.css'
import { IMensagemView } from '../../functions/Chat/IMensagem'


const Mensagem = ({ mensagem } : { mensagem: IMensagemView }) => {
    return (
        <>
            <div className={styles.chatbox}>
                <p>{mensagem.texto}</p>
                <p>{mensagem.data}</p>
            </div>
        </>
    )
}

export default Mensagem