import { useState, useEffect } from "react"
import axios from "axios"
import { rotaBase } from "../RotaBase/rotaBase";
import IChamadoView from "./IChamado";
import api from "../../services/api";


export default async function BuscarChamado(id: number) {
          try {
            const resultado = await api.post(`/buscarChamado`, { cha_id: id })
            // console.log(resultado.data.chamado)
            return {chamado: resultado.data.chamado}
          ;
          } catch (error) {
            console.error('Erro ao buscar nome de funcionario: ', error);
            throw new Error('Erro ao buscar nome de funcionario');
        }
        };

