import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import NotFound from "../pages/notFound";
import React from "react";
import Home from '../pages/homePage'
import Registro from "../pages/registroPage";


const Rotas = () => {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" element={<Registro />} />
            <Route path="*" element={<NotFound />} />
          </Switch>
        </BrowserRouter>
    )
}


export default Rotas