import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import NotFound from "../pages/notFound";
import React from "react";
import Registro from "../pages/registroPage";
import Editinfocli from "../pages/infoCliente";
import Editinfosuport from "../pages/infoSuporte";
import Home from "../pages/homePage";
import LoginPage from "../pages/loginPage";
import LoginAdmPage from "../pages/loginAdmPage"
import RegistroSup from "../pages/registroSupp";
import Ticket from "../pages/envTicket";
import HomeSup from "../pages/homeSup"
import Listagem from "../pages/listasuporte";
import RotaProtegida from "./rotaProtegida";

const Rotas = () => {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <RotaProtegida routeProps={{ path: "/editarsuporte" }} element={<Editinfosuport/>}/>
            <RotaProtegida routeProps={{ path: "/editarcliente" }} element={<Editinfocli/>}/>
            <Route path="/loginadm" element={<LoginAdmPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <RotaProtegida routeProps={{ path: "/registrosuporte" }} element={<RegistroSup/>}/>
            <Route path="*" element={<NotFound/>}/>
            <RotaProtegida routeProps={{ path: "/ticket" }} element={<Ticket/>}/>
            <RotaProtegida routeProps={{ path: "/homesup" }} element={<HomeSup/>}/>
            <RotaProtegida routeProps={{ path: "/listarsuporte" }} element={<Listagem/>}/>
          </Switch>
        </BrowserRouter>
    )
}


export default Rotas