import styles from './Chat.module.css'
import ticketFoto from "../../assets/chat/ticketicon.svg"
import BuscarNomeCliente from '../../functions/Chat/buscarNomeCliFunc'
import BuscarNomeAtendente from '../../functions/Chat/buscarNomeAtendFunc'
import { useEffect, useState } from 'react'
import { getNivelAcesso } from '../../services/auth'
import IChamadoViewMensagem from '../../functions/Tickets/interface/iChamado'
import finishIcon from '../../assets/chat/finishicon.svg'

const HeaderChat = ({ id, chamado }: { id: number; chamado: IChamadoViewMensagem })  => {
    const userTipo = getNivelAcesso();
    return (
        <>
            <header className={styles.header}>
                <div className={styles.info}>
                    <div className={styles.headerEsquerda}>
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
                            <p>Categoria: {chamado.categoria.cat_titulo}</p> 
                        </div>
                    </div>
                    
                    {userTipo === 'atendente' &&
                        <div className={styles.headerDireita}>
                            <div className={styles.encerrarChamado}>
                                <img className={styles.ticketFinish} src={finishIcon} alt="Icone para finalizar o chamado"/>
                                <p> Finalizar atendimento </p>
                            </div>
                        </div>
                        }           
                </div>
            </header>
        </>
    )
}
export default HeaderChat