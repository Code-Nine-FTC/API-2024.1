import styles from './Chat.module.css'
import { IMensagemView } from '../../functions/Chat/IMensagem'
import { getNivelAcesso } from '../../services/auth'


const Mensagem = ({ mensagem } : { mensagem: IMensagemView }) => {
    const nivel = getNivelAcesso()
    console.log('MensagemDados: ', mensagem.autoria)
    return (
        <>
        {nivel !== 'usuario' ?(
            mensagem.autoria ? (
            <div className={styles.chatbox}>
                <p>{mensagem.texto}</p>
                <p>{mensagem.data}</p>
            </div>
            ):(
            <div className={styles.otherchatbox}>
                <p>{mensagem.texto}</p>
                <p>{mensagem.data}</p>
            </div>
            )
        ):(
            mensagem.autoria ? (
            <div className={styles.otherchatbox}>
                <p>{mensagem.texto}</p>
                <p>{mensagem.data}</p>
            </div>
            ): (
            <div className={styles.chatbox}>
                <p>{mensagem.texto}</p>
                <p>{mensagem.data}</p>
            </div>
            )
        )}
        </>
    )
}

export default Mensagem