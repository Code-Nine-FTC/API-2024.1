import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../component/sidebar/sidebar";

export default function VisualizarFuncionario() {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    
    if (!id) {
        navigate('/notfound');
        return null;
    }

    const func_id: number = parseInt(id, 10);
    return (
        <>
          <Sidebar/>      
          <div className="container-maior">
            <span className="container-span-identificacao">
                <h2 className="tipo-funcionario">Detalhes do Funcionário</h2>
                <h2 className="funcionario-id">ID: {func_id}</h2>
            </span>
            <div className="container-info">
                <h3 className="info-nome-funcionario">Nome:</h3>
                <h3 className="info-cpf-funcionario">CPF:</h3>
                <h3 className="info-email-funcionario">E-mail:</h3>
                <h3 className="info-senha-funcionario">Senha:</h3>
                <h3 className="info-ativo-funcionario">Ativo:</h3>
            </div>
          </div>
    </>
);
}