import React from 'react';
import styles from '../../statusBox/statusBox.module.css'
import orange from '../../../assets/faq/rectangle-yellow.png'
import IChamadoView from '../../../functions/Tickets/iChamado';


function statusEspera({ chamado } : { chamado: IChamadoView }){
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
                        <button className={styles.chatButton2} type='button'>Entrar no chat</button>
                        <button className={styles.esperaButton} type='button'>Em espera</button>
                     </div>
                </div>
                    </div>
            </div>
        </div>
    )
}

export default statusEspera;