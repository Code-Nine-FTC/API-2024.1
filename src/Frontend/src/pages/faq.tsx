import '.././component/faq/faq.css';
import Component from '../component/component1/component';
import Component2 from '../component/component2/component2';
import Component3 from '../component/component3/component3';
import Status from '../component/status/status';
import Textostatus from '../component/textostatus/textostatus';
import Ellipse from '../component/ellipse/ellipse';
import Support from '../component/supportbutton/suportbutton';
import React from 'react';

function Faq() {
  return (
  <div className="App">
    <div className="status">
        <Textostatus/>
        <Status/>
    </div>
    <div>
      <p className='blueText'>Ver todos os meus tickets abertos</p>
    </div>
    <br/>
        <h1 className='title'>Perguntas Frequentes</h1>
        <div className='carrousel'>
            <Component/>
            <Component2/>
            <Component3/>
        </div>
        <br/>
      <div className='carrousel-control'>
        <Ellipse/>
        <Ellipse/>
        <Ellipse/>
        <Ellipse/>
        <Ellipse/>
        <Ellipse/>
      </div>
      <br/>
      <div className='support-control'>
        <p className='blueText'>Não encontrou a solução para o seu problema?</p>
        <br/>
        <Support/>
      </div>
</div>
  );
}

export default Faq;
