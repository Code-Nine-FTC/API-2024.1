import styles from './atribuirChamado.module.css'
import { useState, useEffect } from 'react';
import { IFuncionarioView } from '../../../../Backend/src/interfaces/IFuncionario';
import BuscarAtendentesDisponiveis from '../../functions/Tickets/buscarAtendentesDisponiveisFunc';
import AtribuirChamado from '../../functions/Tickets/atribuirChamadoFunc';
import Swal from 'sweetalert2';

export default function AtribuirChamadoModal({ id } : { id : number}) {
    const [viewAtendentes, setViewAtendentes] = useState<IFuncionarioView[]>([]);
    let [funcionarioEscolhido, setFuncionarioEscolhido] = useState<string>('');
    
    useEffect(() => { 
        const fetchBuscarFuncionários = async () => {
            try {
                const resultadoBuscarAtendentesDisponiveis = await BuscarAtendentesDisponiveis();
                if (resultadoBuscarAtendentesDisponiveis.success) {
                    setViewAtendentes(resultadoBuscarAtendentesDisponiveis.data);
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
                    title: "Sucesso!",
                    text: "Atendente atribuído com sucesso!",
                    icon: "success"
                  });
            }
        } catch (error: any) {
            let errorMessage = error.message || 'Erro ao atribuir atendente. Por favor, tente novamente mais tarde.';
            Swal.fire({
                title: 'Erro',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.log('Erro ao atribuir atendente. Por favor, tente novamente mais tarde.', errorMessage, error);
    }};

    return (
        <div className={styles.atribuirChamadoModal}>
            <form>
                <label htmlFor="atendente" className={styles.labelSelect}>Atendentes disponíveis</label>
                <select value={funcionarioEscolhido? funcionarioEscolhido : ""} onChange={(event) => setFuncionarioEscolhido((event.target.value))} className={styles.selectAtendente} name="atendente" required>
                    <option value="" disabled>Escolha um atendente</option>
                    {viewAtendentes.length === 0 && <option value="" disabled>Não há atendentes disponíveis</option>}
                    {viewAtendentes.map((atendente) => (
                                <option key={atendente.func_id} value={atendente.func_id}>{atendente.func_nome}</option>
                            ))}
                </select>
                <button type="submit" className={styles.botaoAtribuir} onClick={DirecionarChamado}>Atribuir</button>
            </form>
        </div>
    )
}