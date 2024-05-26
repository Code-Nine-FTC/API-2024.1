import styles from '../component/faq/Faq.module.css'
import Map from '../component/map/map';
import Delivery from '../component/delivery/delivery';
import Trolley from '../component/trolley/trolley';
import Status from '../component/status/status';
import Textostatus from '../component/textostatus/textostatus';
import Textostatus2 from '../component/textostatus/textoStatus2';
import Ellipse from '../component/ellipse/ellipse';
import Support from '../component/supportbutton/suportbutton';
import React from 'react';
import Sidebar from '../component/sidebar/sidebar';
import { Modal } from '../component/modal/modal';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../services/auth';
import { Link } from 'react-router-dom';
import IChamadoView from '../functions/Tickets/interface/iChamado';
import BuscarUltimoTicketCliente from '../functions/Tickets/buscarUltimoTIcketClienteFunc';
import StatusEmAndamento from '../component/envioticket/statusEmAndamento/statusEmAndamento';
import StatusEspera from '../component/envioticket/statusEmEspera/statusEmEspera';
import FaqComponent from '../component/faq/faqComponent';
// import Statusemandamento from '../component/statusEmAndamento/statusEmAndamento';
// import Statusconcluido from '../component/statusConcluido/statusConcluido';
// import Statusespera from '../component/statusEmEspera/statusEmEspera';


function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [autenticacao, setAutenticacao] = useState(false)
  const [chamado, setChamado] = useState<IChamadoView | null>(null);

    useEffect(()=>{
        const fetchTickets = async () =>{
            try {
                const resultado = await BuscarUltimoTicketCliente();
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

  const handleButtonClick = () => {
    setModalOpen(false)
  }
    useEffect(() => {
      const isAuth = isAuthenticated()
      if(isAuth){
        setAutenticacao(true)
      }
  }, []);


  return (
  <>
  <Sidebar/>
  {modalOpen && (
  <Modal onClose = {handleButtonClick}>
    <h1>This is the modal title</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque obcaecati eius pariatur nulla, quaerat architecto necessitatibus id aliquam voluptatem quasi nisi molestiae labore incidunt amet. Maiores totam consequuntur dicta temporibus?</p>
  </Modal>)}
  <div className={styles.conteudo}>
  {!autenticacao && (
    <h1 className={styles.titulo}> Cadastre-se para ver seus chamados recentes!</h1>
  )}
  {autenticacao && (
    <>
    {chamado && chamado.cha_status ? (
          chamado.cha_status == 'Em Andamento' ? (
            <div className={styles.status}>
              <Textostatus/>
              <StatusEmAndamento chamado={chamado}/>
            </div>
          ):(
            <div className={styles.status}>
              <Textostatus2/>
              <StatusEspera chamado={chamado}/>
            </div>
          )
    ): 
        <p style={{textAlign:"center", fontSize:'1.5em'}}> Não há nenhum chamado em andamento! </p>
    }
    <div>
      <Link to={'/todostickets'}><p className={styles.blueText}>Ver todos os meus tickets abertos →</p></Link>
    </div>
    </>
  )}
    <br/>
        <h1 className={styles.title}>Perguntas Frequentes</h1>
        <FaqComponent/>

      <div className={styles.supportControl}>
        <p className={styles.blueText1}>Não encontrou a solução para o seu problema?</p>
        <br/>
        <Support autenticado={autenticacao} />
      </div>
    </div>
  </>
  );
}

export default Home;
