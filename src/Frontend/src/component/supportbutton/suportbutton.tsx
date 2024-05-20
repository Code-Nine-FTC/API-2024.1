import React from 'react';
import styles from '../faq/Faq.module.css'
import { Link } from 'react-router-dom';

function Support(autenticado: any){
    return(
        <Link to="/criarticket">
            <button className={styles.supportButton}>Converse com um atendente</button>
        </Link> 
    )
}

export default Support;