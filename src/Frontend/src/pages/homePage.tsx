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

const userLogado = 'user'

function Home() {
  return (
  <>
  <Sidebar userTipo={userLogado}/>
  <div className={styles.conteudo}>
    <div className={styles.status}>
        <Textostatus/>
        <Status/>
    </div>
    <div>
      <p className={styles.blueText}>Ver todos os meus tickets abertos →</p>
    </div>
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
        <p className={styles.blueText}>Não encontrou a solução para o seu problema?</p>
        <br/>
        <Support/>
      </div>
    </div>
  </>
  );
}

export default Home;
