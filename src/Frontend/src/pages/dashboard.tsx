import styles from '../component/dashboard/dashboard.module.css';
import React, { useState, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { listarChamadosPorCategoriaEStatus, listarCategorias } from '../functions/dashboard/dash';
import Sidebar from '../component/sidebar/sidebar';
interface ICategoriaView {
    cat_id: number;
    cat_titulo: string;
}

// Registre as escalas e os elementos necessários para Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardView: React.FC = () => {
    const [categorias, setCategorias] = useState<ICategoriaView[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
    const [chamadosPorStatus, setChamadosPorStatus] = useState<{ cha_status: string, total: number }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await listarCategorias();
                if (response.success) {
                    setCategorias(response.categorias);
                    setLoading(false);
                    setError("");
                } else {
                    setError("Erro ao carregar as categorias");
                    setLoading(false);
                }
            } catch (error) {
                setError("Erro ao carregar as categorias");
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    const handleCategoriaChange = async (cat_id: string) => {
        setCategoriaSelecionada(Number(cat_id));
        if (cat_id) {
            const response = await listarChamadosPorCategoriaEStatus(Number(cat_id));
            if (response.success) {
                setChamadosPorStatus(response.chamadosPorStatus);
            } else {
                setError("Erro ao carregar os chamados por status");
            }
        }
    };

    const data = {
        labels: chamadosPorStatus.map(chamado => chamado.cha_status),
        datasets: [
            {
                label: 'Chamados',
                data: chamadosPorStatus.map(chamado => chamado.total),
                backgroundColor: chamadosPorStatus.map((chamado, index) => 
                    index === 0 ? 'rgba(83, 82, 188, 1)' : 
                    index === chamadosPorStatus.length - 1 ? 'rgba(16,15,92,1)' : 'rgba(41, 39, 226, 1)'),
                borderColor: 'rgba(16,15,92,1)',
                borderWidth: 1,
                barPercentage: 0.5,
                categoryPercentage: 0.5,
            }
        ]
    };

    return (
        <>
        <Sidebar/>
        <div className={styles.container}>
            <h2 className={styles.title}>Relatórios de Tickets</h2>
            {loading && <p>Carregando...</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
            <div className={styles.selectContainer}>
                <select className={styles.select} onChange={(e) => handleCategoriaChange(e.target.value)}>
                    <option disabled selected>Selecione uma Categoria</option>
                    {categorias.map(categoria => (
                        <option key={categoria.cat_id} value={categoria.cat_id}>
                            {categoria.cat_titulo}
                        </option>
                    ))}
                </select>
            </div>
            {categoriaSelecionada && chamadosPorStatus.length > 0 && (
                <div className={styles.containerbar}>
                    <h2>{categorias.find(categoria => categoria.cat_id === categoriaSelecionada)?.cat_titulo}</h2>
                    <Bar data={data} className={styles.bar} />
                </div>
            )}
        </div>
        </>
    );
};

export default DashboardView;
