import React from 'react';
import "./modal.css"

interface ModalInterface {
    onClose: () => void,
    children: React.ReactNode,
    titulo: string,
}

export const Modal: React.FC<ModalInterface> = ({onClose, children, titulo}) => {
    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className="modal-header">
                    <p className="titulo">{titulo}</p>
                    <p className='close' onClick={() => onClose()}>&times;</p>
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}