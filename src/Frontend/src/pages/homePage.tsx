import styles from '../component/faq/Faq.module.css'
import Map from '../component/map/map';
import Delivery from '../component/delivery/delivery';
import Trolley from '../component/trolley/trolley';
import Status from '../component/status/status';
import Textostatus from '../component/textostatus/textostatus';
import Ellipse from '../component/ellipse/ellipse';
import Support from '../component/supportbutton/suportbutton';
import React from 'react';
import Sidebar from '../component/sidebar/sidebar';
import { Modal } from '../component/modal/modal';
import { useEffect, useState } from 'react';
import useAutenticarToken from '../rotas/autenticarToken';

function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [autenticacao, setAutenticacao] = useState(false)

  const handleButtonClick = () => {
    setModalOpen(false)
  }
  
  const { autenticado, loading } = useAutenticarToken(localStorage.getItem('token') || '');

  useEffect(() => {
    if (autenticado) {
      setAutenticacao(true);
    }
  }, [autenticado]);
  // useEffect(() => {
  //     const validar = async  () => {
  //       try {
  //         const resultado = await AutenticarToken(token);
  //         if (resultado != undefined) {
  //           setAutenticado(resultado)
  //         }
  //       }catch (error) {
  //         console.error('Erro ao autenticar', error)
  //       }
  //     };
  //     validar()
  // }, [token]);

  return (
  <>
  <Sidebar/>
  {modalOpen && (
  <Modal onClose = {handleButtonClick}>
    <h1>This is the modal title</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque obcaecati eius pariatur nulla, quaerat architecto necessitatibus id aliquam voluptatem quasi nisi molestiae labore incidunt amet. Maiores totam consequuntur dicta temporibus?</p>
  </Modal>)}
  <div className={styles.conteudo}>
  {autenticacao && (
    <>
    <div className={styles.status}>
        <Textostatus/>
        <br></br>
        <Status/>
    </div>
    <div>
      <p className={styles.blueText}>Ver todos os meus tickets abertos →</p>
    </div>
    </>
  )}
    <br/>
        <h1 className={styles.title}>Perguntas Frequentes</h1>
        <div className={styles.carrousel}>
            <Map/>
            <Delivery/>
            <Trolley/>
        </div>
        <br/>
      <div className={styles.carrouselControl}>
        <Ellipse/>
        <Ellipse/>
        <Ellipse/>
        <Ellipse/>
        <Ellipse/>
        <Ellipse/>
      </div>
      <br/>
      <div className={styles.supportControl}>
        <p className={styles.blueText1}>Não encontrou a solução para o seu problema?</p>
        <br/>
        <Support autenticado={autenticacao} />
      </div>
    </div>
  </>
  );
}

export default Home;
