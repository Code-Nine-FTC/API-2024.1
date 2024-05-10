import styles from './Chat.module.css'
import ticketFoto from "../../assets/chat/ticketicon.svg"
import BuscarNomeCliente from '../../functions/Chat/buscarNomeCliFunc'
import BuscarNomeAtendente from '../../functions/Chat/buscarNomeAtendFunc'



const HeaderChat = (id: number, atendente: number, categoria: string, cliente: number) => {
    // const ticket = {
    //     id: '0001',
    //     atendente: 'atendente',
    //     categoria : 'categoria'
    // }
    const nomeCliente = BuscarNomeCliente(cliente)
    const nomeAtendente = BuscarNomeAtendente(atendente)
    const nivel = localStorage.getItem('nivel')
    return (
        <>
            <header className={styles.header}>
                <div className={styles.info}>
                    <div className={styles.alinharDiv}>
                        <img className={styles.ticketFoto} src={ticketFoto} alt="Logo do Ticket"/>
                        <p className={styles.ticket}>Ticket#{id}</p>
                    </div>
                    <div className={styles.alinharInfo}>
                        {nivel !== 'Cliente' ?(
                            <p>Cliente: {nomeCliente}</p>
                        ):(
                            <p>Atendente: {nomeAtendente}</p>
                        )}
                        <p>Categoria: {categoria}</p>
                    </div>                
                </div>
            </header>
        </>
    )
}
export default HeaderChat