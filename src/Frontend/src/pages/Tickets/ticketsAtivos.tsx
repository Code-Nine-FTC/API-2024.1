import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import StatusEmAndamento from "../../component/envioticket/statusEmAndamento/statusEmAndamento";
import StatusEmEspera from "../../component/envioticket/statusEmEspera/statusEmEspera";
import StatusConcluido from "../../component/envioticket/statusConcluido/statusConcluido";

const TicketsAtivos = () => {
    return (
        <>
        <Sidebar/>
        <div>
            <h1>Tickets Ativos</h1>
            <StatusEmAndamento />
            <StatusEmEspera />
            <StatusConcluido/>
        </div>
        </>
    );
}

export default TicketsAtivos;
