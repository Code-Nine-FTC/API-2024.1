import React, { useEffect, useState } from 'react';
import styles from '../../envioticket/EnvioTicket.module.css'
import orange from '../../../assets/faq/rectangle-green.png'
import {IChamadoView} from './IChamadoView'

function StatusConcluido({chamado} : { chamado: IChamadoView }) {

    return(
        <div className={styles.statusBox}>
            <div className={styles.mainText}>
                <div className={styles.buttonAlign}>
                    <img src={orange} className={styles.orangeRectangle}/>
                    <div className={styles.alignDistance}>
                        <div className={styles.alignTicket}>
                            <p className={styles.ticketText}>Ticket#{chamado.cha_id}</p>
                            <p className={styles.ticketText}>{chamado.cha_titulo}</p>
                        </div>
                        <div className={styles.buttonNav}>
                            <button className={styles.chatButton} type='button'>Exibir Conversa</button>
                            <button className={styles.concluidoButton} type='button'>Concluído</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusConcluido;
