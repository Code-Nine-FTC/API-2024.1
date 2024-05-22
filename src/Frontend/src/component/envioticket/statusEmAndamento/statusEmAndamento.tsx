import React from 'react';
import styles from '../../statusBox/statusBox.module.css'
import orange from '../../../assets/faq/rectangle.png'
import { IChamadoView } from '../statusConcluido/IChamadoView';
import { Link } from 'react-router-dom';


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
                    <Link to={`/chat/${chamado.cha_id}`}>
                        <button className={styles.chatButton} type='button'>Entrar no chat</button>
                    </Link>
                        <button className={styles.andamentoButton} type='button'>Em Andamento</button>
                     </div>
                </div>
                    </div>
            </div>
        </div>
    )
}

export default StatusEmAndamento;