import React from 'react';
import styles from '../faq/Faq.module.css'
import delivery from '../../assets/faq/deli.png'


function Delivery(){
    return(
        <div className={styles.item}>
            <img src={delivery} className={styles.reactIcon}/>
            <h3 className={styles.itemTitle}>Destinário ausente</h3>
        </div>
    )
}

export default Delivery;