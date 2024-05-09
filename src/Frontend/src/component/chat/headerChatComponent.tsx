import styles from './Chat.module.css'
import ticketFoto from "../../assets/chat/ticketicon.svg"

const HeaderChat = () => {
    const ticket = {
        id: '0001',
        titulo: 'titulo',
        atendente: 'atendente',
        tipo : 'tipo',
        categoria : 'categoria'
    }
    return (
        <>
            <header className={styles.header}>
                <div className={styles.info}>
                    <div className={styles.alinharDiv}>
                        <img className={styles.ticketFoto} src={ticketFoto} alt="Logo do Ticket"/>
                        <p className={styles.ticket}>Ticket#{ticket.id}</p>
                    </div>
                    <div className={styles.alinharInfo}>
                        <p>Atendente: {ticket.atendente}</p>
                        <p>Tipo: {ticket.tipo}</p>
                        <p>Categoria: {ticket.categoria}</p>
                    </div>                
                </div>
            </header>
        </>
    )
}
export default HeaderChat