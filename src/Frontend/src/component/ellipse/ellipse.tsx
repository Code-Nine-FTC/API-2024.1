import React from 'react';
import styles from '../faq/Faq.module.css'
import ellipse from '../../assets/faq/Ellipse.png'

function Ellipse(){
    return(
        <img src={ellipse} className={styles.ellipse}/>
    )
};

export default Ellipse;