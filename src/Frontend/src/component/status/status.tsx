import React from 'react';
import '../faq.css';
import orange from '../../assets/faq/rectangle.png'

function Status(){
    return(
        <div className='status-box'>
            <div className='main-text'>
                <div className='buttonAlign'>
                    <img src={orange} className='orangeRectangle'/>
                    <div className='alignDistance'>
                    <div className='align01'>
                        <p className='ticketText'>Ticket#0001</p>
                        <p>Não consigo acessar minha encomenda</p>
                    </div>
                    <div className='button-nav'>
                        <button className='chatButton' type='button'>Entrar no chat</button>
                     </div>
                </div>
                    </div>
            </div>
        </div>
    )
}

export default Status;