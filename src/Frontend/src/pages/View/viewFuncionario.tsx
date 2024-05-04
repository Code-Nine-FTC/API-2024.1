import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import { useEffect, useState } from "react"; // Importe o useState
import viewFuncionario from "../../functions/View/viewFuncionarioFunc";
import DetalhesFuncionario from "../../component/View/viewFuncionario";

export default function VisualizarFuncionario() {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [funcionario, setFuncionario] = useState<any>(null);

    useEffect(() => {
        if (!id) {
            navigate('/notfound');
            return;
        }

        const func_id: number = parseInt(id, 10);

        const fetchFuncionario = async () => {
            try {
                const funcionarioData = await viewFuncionario(func_id);
                setFuncionario(funcionarioData);
                console.log(funcionarioData.ativo)
            } catch (error) {
                console.error("Erro ao buscar funcionário:", error);
                // Lide com erros adequadamente
            }
        };

        fetchFuncionario();

        // Adicione func_id como dependência para que useEffect seja chamado sempre que func_id mudar
    }, [id, navigate]);
    console.log(funcionario)

    return (
        <>
            <Sidebar />
            {funcionario && <DetalhesFuncionario id={id} funcionario={funcionario} navigate={navigate}/>}
        </>
    );
}