import { getNivelAcesso } from "../../services/auth"
import IChamadoView from "../../functions/Tickets/iChamado";
import { useEffect, useState } from "react";
import BuscarTicketsEmEspera from "../../functions/Tickets/buscarTicketsEmEsperaFunc";
import Sidebar from "../../component/sidebar/sidebar";
import StatusEmAndamento from "../../component/envioticket/statusEmAndamento/statusEmAndamento";
import StatusEmEspera from "../../component/envioticket/statusEmEspera/statusEmEspera";
import StatusConcluido from "../../component/envioticket/statusConcluido/statusConcluido";
import styles from '../../component/envioticket/EnvioTicket.module.css'

const TicketsEmEspera = () => {
    const user = getNivelAcesso()
    const [chamados, setChamado] = useState<IChamadoView[]>([]);

    useEffect(() =>{
        const fetchTickets = async () => {
            try{
                const resultado = await BuscarTicketsEmEspera(user)
                if(resultado && resultado.chamados){
                    if(Array.isArray(resultado.chamados)){
                        setChamado(resultado.chamados)
                    } else {
                        setChamado([]);
                    }
                    console.log(`Tickets encontrados:`, resultado.chamados);
                }else {
                    console.log(`Tickets não encontrado.`);
                }
            } catch(error){
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
            <h1 className={styles.title}>Tickets em Espera</h1>
            {chamados.map((chamado: IChamadoView) => (
                <div className={styles.ticketcampoEsp}>
                    { chamado.cha_status === 'Em andamento' ? (
                        <StatusEmAndamento chamado={chamado}/>
                    ): chamado.cha_status === 'Em espera' ? (
                        <StatusEmEspera chamado = {chamado}/>
                    ):(
                        <StatusConcluido chamado = {chamado}/>
                    )}
                </div>
            )
            )}
        </div>
        </>
    )
}

export default TicketsEmEspera