import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import NotFound from "../pages/notFound";
import Registro from "../pages/registroPage";
import Home from "../pages/homePage";
import LoginPage from "../pages/Login/loginCliente";
import LoginAdmPage from "../pages/Login/loginAdmPage";
import RegistroSup from "../pages/registroSupp";
import Ticket from "../pages/envTicket";
import HomeSup from "../pages/homeSup";
import Listagem from "../pages/listasuporte";
import VisualizarFuncionario from "../pages/View/viewFuncionarioPage";
import EditarFuncionario from "../pages/Editar/editarFuncionario";
import { FC } from 'react';
import EditarCliente from "../pages/Editar/editarCliente";
import VisualizarCliente from "../pages/View/viewCliente";
import VisualizarPerfilFuncionario from "../pages/View/viewPerfilFuncionario";
import TicketAdm from "../pages/ticketAdm";
import ChatPage from "../pages/chatPage";
import ListagemCategorias from "../pages/listarCategoriaAdm";
import EditarCategoria from "../pages/Editar/editarCategoriaAdm";
import TicketsAtivos from "../pages/Tickets/ticketsEmAtendimentoPage";
import TicketsEmEspera from "../pages/Tickets/ticketsEmEsperaPage";
import TodosTickets from "../pages/Tickets/ticketsTodosPage";
import FAQAdm from "../pages/faqAdm";
import { useContext } from 'react';
import { AuthContext } from '../services/context';
import ListagemFaqs from "../pages/listarFaqAdm";
import EditarFaq from "../pages/Editar/editarFaqAdm";
import DashboardView from "../pages/dashboard";



const Rotas: FC =() => {
  const { isAutenticado, nivelAcesso} = useContext(AuthContext);
  const resultado = isAutenticado;
  const acesso = nivelAcesso;
  console.log(resultado, acesso);
  
  let rotas;

  if (resultado) {
    if (acesso === 'usuario') {
      rotas = (
        <>
          <Route path="/ticketsAtendimento" element={<TicketsAtivos/>} />
          <Route path='/todostickets' element={<TodosTickets/>} />
          <Route path="/editarcliente" element={<EditarCliente />} />
          <Route path="/visualizarcliente" element={<VisualizarCliente />} />
          <Route path="/criarticket" element={<Ticket />} />
          <Route path="/chat/:id" element={<ChatPage/>} />
        </>
      );
    } else if (acesso === 'atendente') {
      rotas = (
        <>
          <Route path="/homesup" element={<HomeSup />} />
          <Route path="/visualizar/perfil/funcionario" element={<VisualizarPerfilFuncionario />} />
          <Route path="/ticketsAtendimento" element={<TicketsAtivos/>} />
          <Route path='/todostickets' element={<TodosTickets/>} />
          <Route path="/chat/:id" element={<ChatPage/>} />
          <Route path='/ticketsespera' element={<TicketsEmEspera/>}/>
        </>
      );
    } else if (acesso === 'administrador') {
      rotas = (
        <>
          <Route path="/editarfuncionario/:id" element={<EditarFuncionario />} />
          <Route path="/visualizarTodosFuncionarios" element={<Listagem />} />
          <Route path="/visualizarfuncionario/:id" element={<VisualizarFuncionario />} />
          <Route path="/registrosuporte" element={<RegistroSup />} />
          <Route path="/visualizar/perfil/funcionario" element={<VisualizarPerfilFuncionario />} />
          <Route path="/ticketadm" element={<TicketAdm />} />
          <Route path="/ticketsAtendimento" element={<TicketsAtivos/>} />
          <Route path='/todostickets' element={<TodosTickets/>} />
          <Route path="/chat/:id" element={<ChatPage/>} />
          <Route path="/listarcategorias" element={<ListagemCategorias/>} />
          <Route path="/editarcategoria/:id" element={<EditarCategoria/>} />
          <Route path='/ticketsativos' element={<TicketsAtivos/>} />
          <Route path='/ticketsespera' element={<TicketsEmEspera/>}/>
          <Route path='/faqadm' element={<FAQAdm/>}/>
          <Route path='/listafaqadm' element={<ListagemFaqs/>}/>
          <Route path='/editarfaq/:id' element={<EditarFaq/>}/>
          <Route path="/dashboard/:id" element={<DashboardView/>}/>
        </>
      );
    }
  } else {
    <Route path="*" element={<Navigate to="/" replace />} />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/loginadm" element={<LoginAdmPage />} />
        <Route path="/login" element={<LoginPage />} />
        {rotas}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;