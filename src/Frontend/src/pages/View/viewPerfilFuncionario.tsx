import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import { useEffect, useState } from "react"; // Importe o useState
import viewPerfilFuncionario from "../../functions/View/viewPerfilFuncionarioFunc";
import DetalhesFuncionario from "../../component/View/Funcionario/viewFuncionario";
import { getNivelAcesso } from "../../services/auth";

export default function VisualizarPerfilFuncionario() {
    const navigate = useNavigate();
    const nivelAcesso = getNivelAcesso()
    const [funcionario, setFuncionario] = useState<any>(null);

    useEffect(() => {
        const fetchFuncionario = async () => {
            try {
                const resultado = await viewPerfilFuncionario();
                setFuncionario(resultado);
            } catch (error) {
                console.error("Erro ao buscar funcionário:", error);
            }
        };

        fetchFuncionario();
    }, [ navigate]);
    console.log(funcionario)

    return (
        <>
            <Sidebar />
            {funcionario && <DetalhesFuncionario funcionario={funcionario} navigate={navigate} nivelAcesso={`${nivelAcesso}`}/>}
        </>
    );
}