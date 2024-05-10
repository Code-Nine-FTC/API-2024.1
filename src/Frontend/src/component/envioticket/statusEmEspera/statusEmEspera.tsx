import React from 'react';
import styles from '../statusBox/statusBox.module.css'
import orange from '../../assets/faq/rectangle-yellow.png'

export interface InfoTicketsProps{
    chamado:{
    cha_id: number
    cha_titulo: string
    cha_descricao: string
    cha_prioridade: string
    cha_status: string
    cha_data_final?: Date
    cha_data_inicio: Date
    cha_topico_chamado: string
    // cliente: Cliente
    // // funcionario?: Funcionario
    // // resposta: Resposta[]
};
navigate: (path: string) => void;
}

function statusEspera({ chamado, navigate }: InfoTicketsProps){
    return(
        <div className={styles.statusBox}>
            <div className={styles.mainText}>
                <div className={styles.buttonAlign}>
                    <img src={orange} className={styles.orangeRectangle}/>
                    <div className={styles.alignDistance}>
                    <div className={styles.alignTicket}>
                        <p className={styles.ticketText}>Ticket#{chamado.cha_id}</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, error!</p>
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