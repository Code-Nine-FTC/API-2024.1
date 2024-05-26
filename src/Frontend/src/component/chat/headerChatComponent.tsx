import styles from './Chat.module.css'
import ticketFoto from "../../assets/chat/ticketicon.svg"
import BuscarNomeCliente from '../../functions/Chat/buscarNomeCliFunc'
import BuscarNomeAtendente from '../../functions/Chat/buscarNomeAtendFunc'
import { useEffect, useState } from 'react'
import { getNivelAcesso } from '../../services/auth'
import IChamadoViewMensagem from '../../functions/Tickets/interface/iChamado'
import finishIcon from '../../assets/chat/finishicon.svg'
import EncerrarTicket from '../../functions/Tickets/encerrarTicketFunc'
import Swal from 'sweetalert2'

const HeaderChat = ({ id, chamado }: { id: number; chamado: IChamadoViewMensagem })  => {
    const userTipo = getNivelAcesso();
    const finalizarChamado = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        Swal.fire({
            title: "Você tem certeza?",
            text: "Não é possível reverter a finalização do chamado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, encerrar"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resultado = await EncerrarTicket(id)
                    console.log(resultado)
                    if (resultado.success) {
                        Swal.fire({
                            title: "Encerrado!",
                            text: "O chamado foi encerrado",
                            icon: "success"
                          });
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
                        };
                    };
                });
            }
    return (
        <>
            <header className={styles.header}>
                <div className={styles.info}>
                    <div className={styles.headerEsquerda}>
                        <div className={styles.alinharDiv}>
                            <img className={styles.ticketFoto} src={ticketFoto} alt="Logo do Ticket"/>
                            <p className={styles.ticket}>Ticket#{id}</p>
                        </div>                
                        <div className={styles.alinharInfo}>
                            {userTipo !== 'usuario' ?(
                                <p>Cliente: {chamado.cliente.cli_nome}</p>
                            ):(
                                <p>Atendente: {chamado.funcionario.func_nome}</p>
                            )}
                            <p>Categoria: {chamado.categoria.cat_titulo}</p> 
                        </div>
                    </div>
                    
                    {userTipo === 'atendente' ? (
                        <div className={styles.headerDireita}>
                            {chamado.cha_status === 'Concluido' ? (
                                <div className={styles.encerrarChamadoConcluido}>
                                    <img className={styles.ticketFinish} src={finishIcon} alt="Icone para finalizar o chamado"/>
                                    <p> Atendimento finalizado </p>
                                </div>
                                ):
                                <div className={styles.encerrarChamado} onClick={finalizarChamado}>
                                    <img className={styles.ticketFinish} src={finishIcon} alt="Icone para finalizar o chamado"/>
                                    <p> Finalizar atendimento </p>
                                </div>
                            }
                        </div>
                    ): (
                        chamado.cha_status === 'Concluido' && (
                            <div className={styles.headerDireita}>
                                <div className={styles.encerrarChamadoConcluido}>
                                    <img className={styles.ticketFinish} src={finishIcon} alt="Icone para finalizar o chamado"/>
                                    <p> Atendimento finalizado </p>
                                </div>
                            </div>
                        )
                    )}  
                </div>
            </header>
        </>
    )
}

export default HeaderChat