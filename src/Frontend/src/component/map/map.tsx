import React from 'react';
import styles from '../faq/Faq.module.css'
import map from '../../assets/faq/map.png';

function Map() {
    return (
        <div className={styles.item}>
            <img src={map} className={styles.reactIcon} alt='Map Icon' />
            <h3 className={styles.itemTitle}>Localizar encomenda</h3>
        </div>
    );
}

export default Map;
