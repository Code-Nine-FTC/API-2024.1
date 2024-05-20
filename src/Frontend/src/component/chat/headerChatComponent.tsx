import styles from './Chat.module.css'
import ticketFoto from "../../assets/chat/ticketicon.svg"
import BuscarNomeCliente from '../../functions/Chat/buscarNomeCliFunc'
import BuscarNomeAtendente from '../../functions/Chat/buscarNomeAtendFunc'
import { useEffect, useState } from 'react'
import { getNivelAcesso } from '../../services/auth'
import IChamadoViewMensagem from '../../functions/Tickets/iChamado'

const HeaderChat = ({ id, chamado }: { id: number; chamado: IChamadoViewMensagem })  => {
    const userTipo = getNivelAcesso();
    return (
        <>
            <header className={styles.header}>
                <div className={styles.info}>
                    <div className={styles.alinharDiv}>
                        <img className={styles.ticketFoto} src={ticketFoto} alt="Logo do Ticket"/>
                        <p className={styles.ticket}>Ticket#{id}</p>
                    </div>
                    <div className={styles.alinharInfo}>
                        {userTipo !== 'usuario' ?(
                            <p>Cliente: {chamado.cliente.cli_nome}</p>
                        ):(
                            <p>Atendente: {chamado.funcionario.func_nome}</p>
                        )}
                        {/* <p>Categoria: {chamado.categoria}</p> */} 
                    </div>                
                </div>
            </header>
        </>
    )
}
export default HeaderChat