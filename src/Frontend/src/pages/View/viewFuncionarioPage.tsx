import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import { useEffect, useState } from "react"; // Importe o useState
import viewFuncionario from "../../functions/View/viewFuncionarioFunc";
import DetalhesFuncionario from "../../component/View/Funcionario/viewFuncionario";
import { getNivelAcesso } from "../../services/auth";

export default function VisualizarFuncionario() {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [funcionario, setFuncionario] = useState<any>(null);
    const nivelAcesso = getNivelAcesso()
    
    useEffect(() => {
        if (!id) {
            navigate('/notfound');
            return;
        }

        const func_id: number = parseInt(id, 10);
        console.log(func_id)

        const fetchFuncionario = async () => {
            try {
                const resultado = await viewFuncionario(func_id);
                setFuncionario(resultado);
            } catch (error) {
                console.error("Erro ao buscar funcionário:", error);
            }
        };

        fetchFuncionario();
    }, [id, navigate]);
    console.log(funcionario)

    return (
        <>
            <Sidebar />
            {funcionario && <DetalhesFuncionario funcionario={funcionario} navigate={navigate} nivelAcesso={`${nivelAcesso}`}/>}
        </>
    );
}