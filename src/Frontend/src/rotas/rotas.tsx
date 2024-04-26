import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import NotFound from "../pages/notFound";
import React from "react";
import Home from '../pages/homePage'
import Registro from "../pages/registroPage";
import Editinfocli from "../pages/altdeinfocliente";
import Editinfosuport from "../pages/altdeinfosuporte";


const Rotas = () => {
    return (
        <BrowserRouter>
          <Switch>

            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/editarsuporte" element={<Editinfosuport/>}/>
            <Route path="/editarcliente" element={<Editinfocli/>}/>
          </Switch>
        </BrowserRouter>
    )
}


export default Rotas