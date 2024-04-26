import React from 'react';
import '../faq/faq.css';
import delivery from '../../assets/faq/Ellipse.png'


function Component2(){
    return(
        <div className='item'>
            <img src={delivery} className='react-icon'/>
            <h3 className='item-title'>Destinário ausente</h3>
        </div>
    )
}

export default Component2;