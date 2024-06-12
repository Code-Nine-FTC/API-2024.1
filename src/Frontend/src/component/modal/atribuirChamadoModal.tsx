import styles from './atribuirChamado.module.css'
import { useState, useEffect } from 'react';
import { IFuncionarioView } from '../../../../Backend/src/interfaces/IFuncionario';
import BuscarAtendentesDisponiveis from '../../functions/Tickets/buscarAtendentesDisponiveisFunc';
import AtribuirChamado from '../../functions/Tickets/atribuirChamadoFunc';
import Swal from 'sweetalert2';

export default function AtribuirChamadoModal({ id } : { id : number}) {
    const [viewAtendentes, setViewAtendentes] = useState<IFuncionarioView[]>([]);
    let [funcionarioEscolhido, setFuncionarioEscolhido] = useState<number | null>(null);
    
    useEffect(() => { 
        const fetchBuscarFuncionários = async () => {
            try {
                const resultadoBuscarAtendentesDisponiveis = await BuscarAtendentesDisponiveis();
                if (resultadoBuscarAtendentesDisponiveis.success) {
                    setViewAtendentes(resultadoBuscarAtendentesDisponiveis.funcionarios);
                } else {
                    console.error("Erro ao carregar os dados dos funcionários");
                }
            } catch (error) {
                console.error("Erro ao carregar os dados dos funcionários: ", error);
            }
        }
        fetchBuscarFuncionários();
    }, []);

    const DirecionarChamado = async (event: any) => {
        event.preventDefault();
        try {
            const resultado = await AtribuirChamado(funcionarioEscolhido, id);
            if (resultado.success) {
                console.log("Chamado atribuído com sucesso");
                Swal.fire({
                    title: "Enviado",
                    text: "O chamado foi enviado",
                    icon: "success"
                  });
            } else {
                console.error("Erro ao atribuir chamado: ", resultado.message);
                Swal.fire({
                    title: "Enviado",
                    text: resultado.message,
                    icon: "error"
                  });
            }
        } catch (error) {
            console.error("Erro ao atribuir chamado: ", error);
        }
    }

    return (
        <div className={styles.atribuirChamadoModal}>
            <form>
                <label htmlFor="atendente" className={styles.labelSelect}>Atendentes disponíveis</label>
                <select value={funcionarioEscolhido? funcionarioEscolhido : ""} onChange={(event) => setFuncionarioEscolhido(Number(event.target.value))} className={styles.selectAtendente} name="atendente" required>
                    <option value="" disabled>Escolha um atendente</option>
                    <option value="teste">Escolha um atendente</option>

                    {viewAtendentes.map((atendente) => (
                                <option key={atendente.func_id} value={atendente.func_id}>{atendente.func_nome}</option>
                            ))}
                </select>
                <button type="submit" onClick={DirecionarChamado}>Atribuir</button>
            </form>
        </div>
    )
}