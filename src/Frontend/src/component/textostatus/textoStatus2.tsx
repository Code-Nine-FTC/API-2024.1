import React from 'react';
import styles from '../faq/Faq.module.css'
import circle2 from '../../assets/faq/circle2.svg'


function Textostatus2(){
    return(
        <div className={styles.flexBaseText}>
            <div>
                <img src={circle2} className={styles.circle}/>
            </div>
            <div>
                <h2 className={styles.statusMain}>Status: Em Espera</h2>
            </div>
        </div>
    )
}

export default Textostatus2;