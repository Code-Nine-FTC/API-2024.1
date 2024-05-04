import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../component/sidebar/sidebar";
import { useEffect, useState } from "react"; // Importe o useState
import viewFuncionario from "../functions/viewFuncionario";

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
            {funcionario && (
                <div className="container-maior">
                    <span className="container-span-identificacao">
                        <h2 className="tipo-funcionario">Detalhes do Funcionário</h2>
                        <h2 className="funcionario-id">ID: {id}</h2>
                    </span>
                    <div className="container-info">
                        <>
                            <h3 className="info-nome-funcionario">Nome: {funcionario.func_nome}</h3>
                            <h3 className="info-cpf-funcionario">CPF: {funcionario.func_cpf}</h3>
                            <h3 className="info-email-funcionario">E-mail: {funcionario.func_email}</h3>
                            <h3 className="info-ativo-funcionario">Ativo: {funcionario.ativo ? 'Ativo' : 'Desativado'}</h3>
                        </>
                    </div>
                    <button onClick={() => navigate(`/editarfuncionario/${id}`)}>Editar</button>
                    <button onClick={() => navigate(`/listarfuncionarios`)}>Voltar</button>

                </div>
            )}
        </>
    );
}