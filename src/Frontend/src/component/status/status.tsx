import React from 'react';
import styles from '../faq/Faq.module.css'
import orange from '../../assets/faq/rectangle.png'

function Status(){
    return(
        <div className={styles.statusBox}>
            <div className={styles.mainText}>
                <div className={styles.buttonAlign}>
                    <img src={orange} className={styles.orangeRectangle}/>
                    <div className={styles.alignDistance}>
                    <div className={styles.alignTicket}>
                        <p className={styles.ticketText}>Ticket#0001</p>
                        <p>Não consigo acessar minha encomenda</p>
                    </div>
                    <div className={styles.buttonNav}>
                        <button className={styles.chatButton} type='button'>Entrar no chat</button>
                     </div>
                </div>
                    </div>
            </div>
        </div>
    )
}

export default Status;