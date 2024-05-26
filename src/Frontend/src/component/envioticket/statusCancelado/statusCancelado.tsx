import React, { useEffect, useState } from 'react';
import styles from '../../statusBox/statusBox.module.css'
import green from '../../../assets/faq/rectangle-green.png'
import {IChamadoView} from '../statusConcluido/IChamadoView'
import { Link, useNavigate } from 'react-router-dom';

function StatusCancelado({chamado} : { chamado: IChamadoView }) {
    return(
        <div className={styles.statusBox}>
            <div className={styles.mainText}>
                <div className={styles.buttonAlign}>
                    <img src={green} className={styles.orangeRectangle}/>
                    <div className={styles.alignDistance}>
                        <div className={styles.alignTicket}>
                            <p className={styles.ticketText}>Ticket#{chamado.cha_id}</p>
                            <p>{chamado.cha_titulo}</p>
                        </div>
                        <div className={styles.buttonNav}>
                        <Link to={`/chat/${chamado.cha_id}`}>
                            <button className={styles.chatButton} type='button'>Entrar no chat</button>
                        </Link>
                            <button className={styles.concluidoButton} type='button'>Cancelado</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusCancelado;