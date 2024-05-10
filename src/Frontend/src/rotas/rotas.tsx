import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
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
import { getNivelAcesso, isAuthenticated } from "../services/auth";
import VisualizarCliente from "../pages/View/viewCliente";
import VisualizarPerfilFuncionario from "../pages/View/viewPerfilFuncionario";
import TicketAdm from "../pages/ticketAdm";

const Rotas: FC = () => {
  const resultado = isAuthenticated();
  const nivelAcesso = getNivelAcesso();

  let rotas;

  if (resultado) {
    if (nivelAcesso === 'usuario') {
      rotas = (
        <>
          <Route path="/editarcliente" element={<EditarCliente />} />
          <Route path="/visualizarcliente" element={<VisualizarCliente />} />
          <Route path="/ticket" element={<Ticket />} />
        </>
      );
    } else if (nivelAcesso === 'atendente') {
      rotas = (
        <>
          <Route path="/homesup" element={<HomeSup />} />
          <Route path="/visualizar/perfil/funcionario" element={<VisualizarPerfilFuncionario />} />
        </>
      );
    } else if (nivelAcesso === 'administrador') {
      rotas = (
        <>
          <Route path="/editarfuncionario/:id" element={<EditarFuncionario />} />
          <Route path="/visualizarTodosFuncionarios" element={<Listagem />} />
          <Route path="/visualizarfuncionario/:id" element={<VisualizarFuncionario />} />
          <Route path="/registrosuporte" element={<RegistroSup />} />
          <Route path="/visualizar/perfil/funcionario" element={<VisualizarPerfilFuncionario />} />
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