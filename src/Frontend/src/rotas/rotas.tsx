  import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import NotFound from "../pages/notFound";
import React from "react";
import Registro from "../pages/registroPage";
import Editinfocli from "../pages/infoCliente";
import Editinfosuport from "../pages/infoSuporte";
import Home from "../pages/homePage";
import LoginPage from "../pages/loginPage";
import RegistroSup from "../pages/registroSupp";


const Rotas = () => {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/editarsuporte" element={<Editinfosuport/>}/>
            <Route path="/editarcliente" element={<Editinfocli/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/registrosuporte" element={<RegistroSup/>}></Route>
            <Route path="*" element={<NotFound/>}/>
          </Switch>
        </BrowserRouter>
    )
}


export default Rotas