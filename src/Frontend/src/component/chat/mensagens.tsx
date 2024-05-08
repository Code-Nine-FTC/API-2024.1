import styles from './Chat.module.css'

const Mensagem = () => {
    const message = {
        msg:'msg',
        tempo: 'tempo'
    }
    return (
        <>
            <div className={styles.chatbox}>
                <p>Boa tarde, não estou conseguindo localizar minha encomenda.</p>
                <p>{message.tempo}</p>
            </div>
        </>
    )
}

export default Mensagem