import styles from './Chat.module.css'

const Mensagem = () => {
    const message = {
        msg:'msg',
        tempo: 'tempo'
    }
    return (
        <>
            <div className={styles.chatbox}>
                <p className={styles.font}>Boa tarde, não estou conseguindo localizar minha encomenda.</p>
                <p>{message.tempo}</p>
            </div>
            <div className={styles.otherchatbox}>
                <p>Boa tarde, você já checou o seu email para ver se foi enviado o código de rastreamento?</p>
                <p>{message.tempo}</p>
            </div>
        </>
    )
}

export default Mensagem