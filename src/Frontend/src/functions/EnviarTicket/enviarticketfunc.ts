import React from "react"
import axios from "axios"
import api from "../../services/api";
import { rotaBase } from "../RotaBase/rotaBase";
import { useState } from "react";
import IdadosChamado from "./IChamado"



const enviarTicket = async (evento: React.FormEvent<HTMLFormElement>, dadosChamado: IdadosChamado ) => {
    const token = localStorage.getItem('token')
    try{
        evento.preventDefault()
        const resultado = await api.post(`${rotaBase}/cadastroChamado`, dadosChamado);
        return {enviarTicket :resultado.data.enviarTicket, message: resultado.data.message}
    }
    catch(error) {
        console.error('Erro ao enviar Ticket: ', error)
        throw new Error('Erro ao enviar Ticket')
    }
    
}

export default enviarTicket