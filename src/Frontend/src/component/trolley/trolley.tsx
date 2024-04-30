import React from 'react';
import styles from '../faq/Faq.module.css'
import trolley from '../../assets/faq/trolley.png'


function Trolley(){
    return(
        <div className={styles.item}>
            <img src={trolley} className={styles.reactIcon}/>
            <h3 className={styles.itemTitle}>Danos à encomenda</h3>
        </div>
    )
}

export default Trolley;