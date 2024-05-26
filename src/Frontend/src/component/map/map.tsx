import React from 'react';
import styles from '../faq/Faq.module.css'
import map from '../../assets/faq/map.png';
import { Modal } from '../modal/modal';
import { useState } from 'react';

function Map() {

    const [modalOpen, setModalOpen] = useState(false)
    const handleButtonClick = () => {
        setModalOpen(false)
    }

    return (
        <>  
            <div className={styles.item}>
                <button className={styles.button1} type="button" onClick={() => setModalOpen(true)}>
                    <img src={map} className={styles.reactIcon} alt='Map Icon' />
                    <h3 className={styles.itemTitle}>Localizar encomenda</h3>
                </button>
            </div>
            {modalOpen && (
                <Modal onClose={handleButtonClick}>
                    <h1>Como rastrear a encomenda?</h1>
                    <p> Para rastrear sua encomenda, você precisará do número de rastremento, fornecido  pela empresa de transporte ou loja online onde fez a compra. Esse número geralmente é enviado por e-mail após a confirmação do envio.  Uma vez que tenha o número, acesse o site da transportadora ou da loja e insira-o na opção de rastreamento. Isso fornecerá informações atualizadas sobre o status e a localização da sua encomenda.</p>
                </Modal>)}


        </>
    );
}

export default Map;
