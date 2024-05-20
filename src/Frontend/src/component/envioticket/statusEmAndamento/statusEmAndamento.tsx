import React from 'react';
import styles from '../../statusBox/statusBox.module.css'
import orange from '../../../assets/faq/rectangle.png'
import { IChamadoView } from '../statusConcluido/IChamadoView';


const StatusEmAndamento = ({ chamado } : { chamado: IChamadoView }) => {
    return(
        <div className={styles.statusBox}>
            <div className={styles.mainText}>
                <div className={styles.buttonAlign}>
                    <img src={orange} className={styles.orangeRectangle}/>
                    <div className={styles.alignDistance}>
                    <div className={styles.alignTicket}>
                        <p className={styles.ticketText}>Ticket#{chamado.cha_id}</p>
                        <p>{chamado.cha_titulo}</p>
                    </div>
                    <div className={styles.buttonNav}>
                        <button className={styles.chatButton} type='button'>Entrar no chat</button>
                        <button className={styles.andamentoButton} type='button'>Em andamento</button>
                     </div>
                </div>
                    </div>
            </div>
        </div>
    )
}

export default StatusEmAndamento;