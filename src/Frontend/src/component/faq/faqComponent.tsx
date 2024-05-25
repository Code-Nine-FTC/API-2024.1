import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './Faq.module.css';
import map from '../../assets/faq/map.png';
import ListarFaqs from '../../functions/faq/listarFaq';
import { useEffect, useState } from 'react';
import { IFaqView } from '../../../../Backend/src/interfaces/IFaq';
import { Modal } from '../modal/modal';

const FaqComponent = () => {
    const [faqs, setFaqs] = useState<IFaqView[]>([]);

    useEffect(() => {
        const buscarFaqs = async() => {
            try {
                const resultado = await ListarFaqs(); 
                if (resultado && resultado.faqs) {
                    if (Array.isArray(resultado.faqs)) {
                        setFaqs(resultado.faqs);
                    } else {
                        setFaqs([]);
                    }
                    console.log(`Faqs encontrados:`, resultado.faqs);
                } else {
                    console.log(`Faqs não encontrado.`);
                }
            } catch (error) {
                console.error("Erro ao encontrar Faqs:", error);
            }
            }
        buscarFaqs();
    }, []);
    
    useEffect(() => {
        console.log('faqs adicionados')
        console.log(faqs);
    }, [faqs]);

    console.log('all faqs', faqs); // Check the data

    return (
        <>
        {faqs.length > 0 ? (
                faqs.map((faq: IFaqView) => {
                    // console.log('faq in loop', faq); // Check each item
                    console.log('Rendering FAQ item:', faq)
                    return (
                        <div className={styles.item} key={faq.faq_id}>
                            <h1>{faq.faq_titulo}</h1>
                            <p> {faq.faq_descricao}</p>
                            <p> {faq.faq_exemplo} </p>
                        </div>
                    );
                })
        ) : (
            <p> Não há FAQs para exibir </p>
        )}
    </>
    );
}

export default FaqComponent;