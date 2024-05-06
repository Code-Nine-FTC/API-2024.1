import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import { useEffect, useState } from "react"; // Importe o useState
import viewCliente from "../../functions/View/viewClienteFunc";
import DetalhesCliente from "../../component/View/viewClienteComponent";

export default function VisualizarCliente() {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [cliente, setCliente] = useState<any>(null);
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!id) {
            navigate('/notfound');
            return;
        }

        const cli_id: number = parseInt(id, 10);

        const fetchCliente = async () => {
            try {
                const clienteData = await viewCliente(cli_id, token);
                setCliente(clienteData);
                console.log(clienteData.ativo)
            } catch (error) {
                console.error("Erro ao buscar cliente: ", error);
                // Lide com erros adequadamente
            }
        };

        fetchCliente();

        // Adicione func_id como dependência para que useEffect seja chamado sempre que func_id mudar
    }, [id, navigate]);
    console.log(cliente)

    return (
        <>
            <Sidebar />
            {cliente && <DetalhesCliente cliente={cliente} navigate={navigate}/>}
        </>
    );
}