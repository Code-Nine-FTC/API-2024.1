import React from 'react';
import styles from '../faq/Faq.module.css'
import delivery from '../../assets/faq/deli.png'
import { Modal } from '../modal/modal';
import { useState } from 'react';


function Delivery(){

    const [modalOpen, setModalOpen] = useState(false)
    const handleButtonClick = () => {
        setModalOpen(false)
    }

    return(
        <>
            <div className={styles.item}>
                <button className={styles.button1} onClick={() => setModalOpen(true)}>
                    <img src={delivery} className={styles.reactIcon}/>
                    <h3 className={styles.itemTitle}>Destinário ausente</h3>
                </button>
            </div>
            {/* {modalOpen && (
                <Modal onClose={handleButtonClick}>
                    <h1>E se eu perder o prazo de entrega?</h1>
                    <p> Pedimos desculpas pelo inconveniente. Se sua encomenda não chegou dentro do prazo estimado, recomendamos que você verifique o status da sua encomenda utilizando o número de rastreamento fornecido em nosso site. Em caso de atraso, entre em contato conosco para que possamos investigar e resolver a situação o mais rápido possível. Nosso objetivo é garantir que suas encomendas sejam entregues dentro do prazo e faremos o possível para resolver qualquer problema de entrega.</p>
                </Modal>)} */}

        </>
    )
}

export default Delivery;