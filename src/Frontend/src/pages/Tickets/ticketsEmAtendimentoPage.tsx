import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import StatusEmAndamento from "../../component/envioticket/statusEmAndamento/statusEmAndamento";
import StatusEmEspera from "../../component/envioticket/statusEmEspera/statusEmEspera";
import StatusConcluido from "../../component/envioticket/statusConcluido/statusConcluido";
import { getNivelAcesso } from "../../services/auth";
import BuscarTicketsEmAtendimento from "../../functions/Tickets/buscarTIcketsEmAtendimentoFunc";
import { useEffect, useState } from "react";
import IChamadoView from "../../functions/Tickets/interface/iChamado";
import styles from '../../component/envioticket/EnvioTicket.module.css'

const TicketsAtivos = () => {
    const user = getNivelAcesso()
    const [chamados, setChamado] = useState<IChamadoView[]>([]);

    useEffect(()=>{
        const fetchTickets = async () =>{
            try {
                const resultado = await BuscarTicketsEmAtendimento(user);
                if (resultado && resultado.chamados) {
                    console.log('teste foda', resultado.chamados)
                    if (Array.isArray(resultado.chamados)) {
                        setChamado(resultado.chamados);
                    } else {
                        setChamado([]);
                    }
                    console.log(`Tickets encontrados:`, resultado.chamados);
                } else {
                    console.log(`Tickets não encontrado.`);
                }
            } catch (error) {
                console.error("Erro ao encontrar Tickets:", error);
            }
        } 
         fetchTickets()
    },[user])

    useEffect(() => {
        console.log('tickets adicionados')
        console.log(chamados);
    }, [chamados]);

    return (
        
        <>
        <Sidebar/>
        <div className={styles.container}>
            <h1 className={styles.title}>Tickets Ativos</h1>
            {chamados.map((chamado: IChamadoView) => (
                <div className={styles.ticketcampo}>
                    { chamado.cha_status === 'Em andamento' ? (
                        <StatusEmAndamento chamado={chamado}/>
                    ): chamado.cha_status === 'Em espera' ? (
                        <StatusEmEspera chamado = {chamado}/>
                    ): (
                        <StatusConcluido chamado={chamado}/>
                    )}
                </div>
            ))}
        </div>
        </>
    );
}

export default TicketsAtivos;
