import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import StatusEmAndamento from "../../component/envioticket/statusEmAndamento/statusEmAndamento";
import StatusEmEspera from "../../component/envioticket/statusEmEspera/statusEmEspera";
import StatusConcluido from "../../component/envioticket/statusConcluido/statusConcluido";
import { getNivelAcesso } from "../../services/auth";
import BuscarTodosTickets from "../../functions/Tickets/buscarTodosTicketsFunc";
import { useEffect, useState } from "react";
import IChamadoView from "../../functions/Tickets/iChamado";

const TodosTickets = () => {
    const user = getNivelAcesso()
    const [chamados, setChamado] = useState<IChamadoView[]>([]);

    useEffect(()=>{
        const fetchTickets = async () =>{
            try {
                const resultado = await BuscarTodosTickets(user);
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
        <div>
            <h1>Todos os Tickets</h1>
            {chamados.map((chamado: IChamadoView) => (
                <div className="ticketcampo">
                    { chamado.cha_status === 'Em andamento' ? (
                        <StatusEmAndamento chamado={chamado}/>
                    ): chamado.cha_status === 'Em espera' ? (
                        <StatusEmEspera />
                    ): (
                        <StatusConcluido chamado={chamado} />
                    )}
                </div>
            ))}
        </div>
        </>
    );
}

export default TodosTickets;