import { rotaBase } from "./rotaBase";
import React, {useState} from "react";
import ClienteController from "../../../Backend/src/controllers/clienteController";

// const CadastroClienteFunc = async (formData: any) => {
//     try {
//         const clienteController = new ClienteController();
//         // const resultado = await clienteController.cadastrarCliente(formData)
//         return resultado ;
//     }
//     catch (error) {
//         console.error('Erro durante o cadastro', error)
//         throw new Error('Erro ao cadastrar o cliente')
//     }
// }

// export default CadastroClienteFunc