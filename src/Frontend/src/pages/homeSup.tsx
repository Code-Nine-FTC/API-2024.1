import Sidebar from "../component/sidebar/sidebar"
import Status from '../component/status/status';
import styles from '../component/homeSup/HomeSuporte.module.css'
import Textostatus from "../component/textostatus/textostatus";
import { useEffect, useState } from "react";
import BuscarUltimoTicketSup from "../functions/Tickets/buscarUltimoTicketSupFunc";
import IChamadoView from "../functions/Tickets/interface/iChamado";
import StatusEmAndamento from "../component/envioticket/statusEmAndamento/statusEmAndamento";
import StatusEmEspera from "../component/envioticket/statusEmEspera/statusEmEspera"
import StatusConcluido from "../component/envioticket/statusConcluido/statusConcluido";

const HomeSup = () =>{
    const [chamado, setChamado] = useState<IChamadoView | null>(null);

    useEffect(()=>{
        const fetchTickets = async () =>{
            try {
                const resultado = await BuscarUltimoTicketSup();
                if (resultado && resultado.chamados) {
                    console.log('teste', resultado.chamados)
                    setChamado(resultado.chamados);
                    console.log(`Tickets encontrados:`, resultado.chamados);
                } else {
                    console.log(`Ticket não encontrado.`)
                    setChamado(null);
                }
            } catch (error) {
                console.error("Erro ao encontrar Tickets:", error);
            }
        } 
         fetchTickets()
    },[])

    useEffect(() => {
        console.log('ticket adicionado')
        console.log(chamado);
    }, [chamado]);

    return(
        <>
            <Sidebar/>
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>Bem-Vindo !</h1>
                    <br></br>
                    {/* <div className={styles.ticketcampo}>
                    {chamado && (
                        chamado.cha_status === 'Em andamento' ? (
                            <StatusEmAndamento chamado={chamado}/>
                        ) : chamado.cha_status === 'Em espera' ? (
                            <StatusEmEspera chamado={chamado}/>
                        ) : (
                            <StatusConcluido chamado={chamado}/>
                        )
                    )}
                </div> */}
                    <br></br>
                    <hr className={styles.linha}></hr>   
                </header>
                <br></br>
                <div className={styles.conteudo}>                
               
                    
                    {chamado && chamado.cha_status ? (
                         <div className={styles.status}>
                            <Textostatus/>
                                <StatusEmAndamento chamado={chamado}/>
                        </div>
                    ): 
                        <p style={{textAlign:"center", fontSize:'1.5em'}}> Não há nenhum chamado em andamento! </p>
                    }
                    <br></br>
                </div>
            </div>

        </>
    )
}

export default HomeSup