import React from 'react';
import styles from '../faq/Faq.module.css'
import circle from '../../assets/faq/circle.png'


function Textostatus(){
    return(
        <div className={styles.flexBaseText}>
            <div>
                <img src={circle} className={styles.circle}/>
            </div>
            <div>
                <h2 className={styles.statusMain}>Status: Em andamento</h2>
            </div>
        </div>
    )
}

export default Textostatus;