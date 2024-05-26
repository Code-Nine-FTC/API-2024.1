import { useEffect, useState } from "react";
import viewCliente from "../../functions/View/viewClienteFunc";
import Sidebar from "../../component/sidebar/sidebar";
import DetalhesCliente from "../../component/View/Cliente/viewCliente";

export default function VisualizarCliente(){
    const [cliente, setCliente]= useState<any>(null)
    useEffect(()=>{
    const fetchCliente = async () =>{
        try {
            const resultado = await viewCliente();
            setCliente(resultado.cliente)
            console.log(`Encontrou aqui`)
        } catch (error) {
            console.error("Erro ao encontrar Cliente:", error);
        }
    } 
     fetchCliente()
},[])
    console.log(cliente)
    return(
        <>
            <Sidebar/>
            {cliente && <DetalhesCliente cliente={cliente} />}
        </>
    )
}