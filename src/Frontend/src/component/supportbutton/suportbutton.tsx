import React from 'react';
import styles from '../faq/Faq.module.css'
import { Link } from 'react-router-dom';

function Support({ autenticado }: { autenticado: boolean }){
    return(
        <>
            {autenticado ? (
                <Link to="/criarticket">
                    <button className={styles.supportButton}>Converse com um atendente</button>
                </Link> 
            ) : (
                <Link to="/login">
                    <button className={styles.supportButton}>Converse com um atendente</button>
                </Link>
            )}
        </>
    );
};

export default Support;