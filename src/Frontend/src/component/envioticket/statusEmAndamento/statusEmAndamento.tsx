import React from 'react';
import styles from '../../statusBox/statusBox.module.css'
import orange from '../../../assets/faq/rectangle.png'


function statusemandamento({ }){
    return(
        <div className={styles.statusBox}>
            <div className={styles.mainText}>
                <div className={styles.buttonAlign}>
                    <img src={orange} className={styles.orangeRectangle}/>
                    <div className={styles.alignDistance}>
                    <div className={styles.alignTicket}>
                        <p className={styles.ticketText}>Ticket#0000</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, error!</p>
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

export default statusemandamento;