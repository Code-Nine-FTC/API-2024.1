
import styles from './Faq.module.css';
import map from '../../assets/faq/map.png';
import ListarFaqs from '../../functions/faq/listarFaq';
import { useEffect, useState } from 'react';
import { IFaqView } from '../../../../Backend/src/interfaces/IFaq';
import { Modal } from '../modal/modal';

const FaqComponent = () => {
    const [faqs, setFaqs] = useState<IFaqView[]>([]);
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);
    type AccordionProps = {
        title: string;
        children: React.ReactNode;
        isOpen: boolean;
        onClick: () => void;
      };
      
      const Accordion: React.FC<AccordionProps> = ({ title, children, isOpen, onClick }) => {
        return (
            <div>
              <button className={styles.accordeonbutton} onClick={onClick}>
                {isOpen ? '' : ''} 
                <h2 className={styles.accordeontitle}>{title}</h2>
                <span className={styles.arrowDown}></span>
              </button>
              {isOpen && <div>{children}</div>}
            </div>
          );
          
      };

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

    console.log('all faqs', faqs); 

    return (
        <>
          {faqs.length > 0 ? (
            faqs.map((faq: IFaqView) => {
              const isOpen = openFaqId === faq.faq_id;
              return (
                <div className={styles.accordionwrapper} key={faq.faq_id}>
                  <Accordion
                    title={faq.faq_titulo}
                    isOpen={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.faq_id)}>
                    <div className={styles.accordioncontent}>
                    <p className={styles.accordiondescricao}>{faq.faq_descricao}</p>
                    <p className={styles.accordionexemplo}>Exemplo:{faq.faq_exemplo}</p>
                    
                    </div>
                  </Accordion>
                </div>
              );
            })
          ) : (
            <p>Não há FAQs para exibir</p>
          )}
        </>
      );
      
      
      
      
}

export default FaqComponent;