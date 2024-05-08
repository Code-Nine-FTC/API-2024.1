import styles from './Chat.module.css'


const HeaderChat = () => {
    const ticket = {
        titulo: 'titulo',
        atendente: 'atendente',
        tipo : 'tipo',
        categoria : 'categoria'
    }
    return (
        <>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.info}>
                        <p className={styles.ticket}>`Ticket#${ticket.titulo}`</p>
                        <br></br>
                        <p>`Atendente: ${ticket.atendente}`</p>
                        <p>`Tipo: ${ticket.tipo}`</p>
                        <p>`Categoria: ${ticket.categoria}`</p>
                    </div>
                </header>
                <section>
                    <h1>Bem Vindo</h1>
                </section>
            </div>

        </>
    )
}

export default HeaderChat