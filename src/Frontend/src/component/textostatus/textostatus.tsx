import React from 'react';
import '../faq.css';
import circle from '../../assets/faq/circle.png'


function Textostatus(){
    return(
        <div className='flex-baseText'>
            <div>
                <img src={circle} className='circle'/>
            </div>
            <div>
                <h2 className='statusMain'>Status: Em andamento</h2>
            </div>
        </div>
    )
}

export default Textostatus;