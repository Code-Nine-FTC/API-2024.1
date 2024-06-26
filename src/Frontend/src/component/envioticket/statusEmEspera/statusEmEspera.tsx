import React, { useState } from 'react';
import styles from '../../statusBox/statusBox.module.css'
import orange from '../../../assets/faq/rectangle-orange.svg'
import IChamadoView from '../../../functions/Tickets/interface/iChamado';
import IniciarChamado from '../../../functions/Tickets/iniciarTicketFunc';
import { getNivelAcesso } from '../../../services/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Prioridade from '../prioridadeComponent';
import { Modal } from '../../modal/modal';
import AtribuirChamadoModal from '../../modal/atribuirChamadoModal';

function StatusEspera({ chamado } : { chamado: IChamadoView }){
    const navigate = useNavigate()
    const user = getNivelAcesso();
    const [modal, setModal] = useState(false);
    console.log(chamado.cha_prioridade)
    
    const ComecarChamado = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
        const resultado = await IniciarChamado(chamado.cha_id);
        console.log(resultado)
        if (resultado.success) {
            navigate(`/chat/${chamado.cha_id}`);
        }

    } catch (error: any) {
        let errorMessage = error.message || 'Erro ao iniciar o chamado. Por favor, tente novamente mais tarde.';
            Swal.fire({
                title: 'Erro',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.log('Erro ao iniciar o chamado. Por favor, tente novamente mais tarde.', errorMessage, error);
    }};
    
    const AtribuirChamado = (event: React.MouseEvent<HTMLButtonElement>) => {
        setModal(true)
    }
    
    const closeModal = () => {
        setModal(false);
    }

    return(
        <>
        <div className={styles.statusBox}>
            <div className={styles.mainText}>
                <div className={styles.buttonAlign}>
                    <img src={orange} className={styles.orangeRectangle}/>
                    <div className={styles.alignDistance}>
                    <div className={styles.alignTicket}>
                        <p className={styles.ticketText}>Ticket#{chamado.cha_id}</p>
                        <p>{chamado.cha_titulo}</p>
                    </div>
                    <div className={styles.buttonNav}>
                    {user === 'atendente' ? (
                        <button className={styles.chatButtonAtn} type='button' onClick={ComecarChamado}>Iniciar atendimento</button>):
                        (
                        <>
                            {user === 'usuario' && (
                                <button className={styles.chatButton2} type='button' disabled >Entrar no chat</button>
                            )}
                            {user === 'administrador' && (
                                <button className={styles.chatButtonAtn} type='button' onClick={AtribuirChamado}>Atribuir atendente</button>
                            )}
                            </>
                        )}
                        <button className={styles.esperaButton} type='button'>Em Espera</button>
                        {user !== 'usuario' && (
                            <Prioridade prioridade = {chamado.cha_prioridade}/>
                        )}      
                     </div>
                </div>
                    </div>
            </div>
        </div>
        {modal && (
            <Modal onClose={closeModal} titulo='Atribuir Chamado'>
                <AtribuirChamadoModal id={chamado.cha_id}/>
            </Modal>
        )}
        </>
    )
}

export default StatusEspera;