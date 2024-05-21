import React from 'react';
import styles from '../faq/Faq.module.css'
import trolley from '../../assets/faq/trolley.png'
import { Modal } from '../modal/modal';
import { useState } from 'react';


function Trolley(){

    const [modalOpen, setModalOpen] = useState(false)
    const handleButtonClick = () => {
        setModalOpen(false)
    }

    return(
        <>  
            <div className={styles.item}>
                <button className={styles.button1} onClick={() => setModalOpen(true)}>
                    <img src={trolley} className={styles.reactIcon}/>
                    <h3 className={styles.itemTitle}>Danos à encomenda</h3>
                </button>
            </div>
            {modalOpen && (
                <Modal onClose={handleButtonClick}>
                    <h1>Danos à encomenda</h1>
                    <p> Lamentamos pelo erro. Por favor, entre em contato conosco imediatamente para que possamos providenciar a substituição do produto ou um reembolso, conforme necessário. Se possível, forneça fotos do produto danificado para nos ajudar a resolver o problema com mais eficiência.</p>
            </Modal>)}
        </>
    )
}

export default Trolley;