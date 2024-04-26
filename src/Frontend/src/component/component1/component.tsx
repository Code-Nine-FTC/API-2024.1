import React from 'react';
import '../faq/faq.css';
import map from '../../assets/faq/map.png';

function Component() {
    return (
        <div className='item'>
            <img src={map} className='react-icon' alt='Map Icon' />
            <h3 className='item-title'>Localizar encomenda</h3>
        </div>
    );
}

export default Component;
