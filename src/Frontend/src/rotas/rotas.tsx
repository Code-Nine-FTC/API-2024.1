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

const Rotas = () => {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/editarsuporte" element={<Editinfosuport/>}/>
            <Route path="/editarcliente" element={<Editinfocli/>}/>
            <Route path="/loginadm" element={<LoginAdmPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/registrosuporte" element={<RegistroSup/>}></Route>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/ticket" element={<Ticket/>}></Route>
            <Route path="/homesup" element={<HomeSup/>}></Route>
            <Route path="/listarsuporte" element={<Listagem/>}></Route>
          </Switch>
        </BrowserRouter>
    )
}


export default Rotas