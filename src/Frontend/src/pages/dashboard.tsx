import React, { useState, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { listarChamadosPorCategoriaEStatus, listarCategorias, listarTodosChamadosPorCategoria } from '../functions/dashboard/dash';
import Sidebar from '../component/sidebar/sidebar';
import styles from '../component/dashboard/dashboard.module.css';

interface ICategoriaView {
    cat_id: number;
    cat_titulo: string;
}

interface IChamadoPorCategoria {
    cat_titulo: string;
    cha_status: string;
    total: number;
}

// Registre as escalas e os elementos necessários para Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Mova a função getRandomColor para antes do uso
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const DashboardView: React.FC = () => {
    const [categorias, setCategorias] = useState<ICategoriaView[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
    const [chamadosPorStatus, setChamadosPorStatus] = useState<{ cha_status: string, total: number }[]>([]);
    const [todosChamadosPorCategoria, setTodosChamadosPorCategoria] = useState<IChamadoPorCategoria[]>([]);
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

        const fetchTodosChamados = async () => {
            try {
                const response = await listarTodosChamadosPorCategoria();
                if (response.success) {
                    setTodosChamadosPorCategoria(response.chamadosPorCategoria);
                    setLoading(false);
                    setError("");
                } else {
                    setError("Erro ao carregar todos os chamados");
                    setLoading(false);
                }
            } catch (error) {
                setError("Erro ao carregar todos os chamados");
                setLoading(false);
            }
        };

        fetchCategorias();
        fetchTodosChamados();
    }, []);

    const handleCategoriaChange = async (cat_id: string) => {
        if (cat_id === "todas") {
            setCategoriaSelecionada(null);
        } else {
            setCategoriaSelecionada(Number(cat_id));
            if (cat_id) {
                const response = await listarChamadosPorCategoriaEStatus(Number(cat_id));
                if (response.success) {
                    setChamadosPorStatus(response.chamadosPorStatus);
                } else {
                    setError("Erro ao carregar os chamados por status");
                }
            }
        }
    };

    const dataPorCategoria = {
        labels: todosChamadosPorCategoria.map(chamado => chamado.cat_titulo),
        datasets: [
            {
                label: 'Chamados',
                data: todosChamadosPorCategoria.map(chamado => chamado.total),
                backgroundColor: todosChamadosPorCategoria.map((chamado, index) =>
                    index === 0 ? 'rgba(83, 82, 188, 1)' :
                    index === todosChamadosPorCategoria.length - 1 ? 'rgba(16, 15, 92, 1)' : 'rgba(41, 39, 226, 1)'),
                borderColor: todosChamadosPorCategoria.map((chamado, index) =>
                    index === 0 ? 'rgba(83, 82, 188, 1)' :
                    index === todosChamadosPorCategoria.length - 1 ? 'rgba(16, 15, 92, 1)' : 'rgba(41, 39, 226, 1)'),
                borderWidth: 1,
                barThickness: 60,
            }
        ]
    };

    const data = {
        labels: chamadosPorStatus.map(chamado => chamado.cha_status),
        datasets: [
            {
                label: 'Chamados',
                data: chamadosPorStatus.map(chamado => chamado.total),
                backgroundColor: chamadosPorStatus.map((chamado, index) =>
                    index === 0 ? 'rgba(83, 82, 188, 1)' :
                    index === chamadosPorStatus.length - 1 ? 'rgba(16, 15, 92, 1)' : 'rgba(41, 39, 226, 1)'),
                borderColor: chamadosPorStatus.map((chamado, index) =>
                    index === 0 ? 'rgba(83, 82, 188, 1)' :
                    index === chamadosPorStatus.length - 1 ? 'rgba(16, 15, 92, 1)' : 'rgba(41, 39, 226, 1)'),
                borderWidth: 1,
                barThickness: 60,
            }
        ]
    };

    return (
        <>
            <Sidebar />
            <div className={styles.container}>
                <h2 className={styles.title}>Relatórios de Tickets</h2>
                {loading && <p>Carregando...</p>}
                {error && <p className={styles.errorMessage}>{error}</p>}
                <div className={styles.selectContainer}>
                    <select className={styles.select} onChange={(e) => handleCategoriaChange(e.target.value)}>
                        <option disabled value="">Selecione uma Categoria</option>
                        <option value="todas">Todas as Categorias</option>
                        {categorias.map(categoria => (
                            <option key={categoria.cat_id} value={categoria.cat_id}>
                                {categoria.cat_titulo}
                            </option>
                        ))}
                    </select>
                </div>
                {categoriaSelecionada === null && todosChamadosPorCategoria.length > 0 && (
                    <div className={styles.containerbar}>
                        <h2 className={styles.texto}>Todas as Categorias</h2>
                        <Bar data={dataPorCategoria} options={{
                            indexAxis: 'y',
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        display: false
                                    }
                                },
                                x: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 1
                                    }
                                }
                            }
                        }} className={styles.bar} />
                    </div>
                )}
                {categoriaSelecionada && chamadosPorStatus.length > 0 && (
                    <div className={styles.containerbar}>
                        <h2 className={styles.texto}>{categorias.find(categoria => categoria.cat_id === categoriaSelecionada)?.cat_titulo}</h2>
                        <Bar data={data} options={{
                            indexAxis: 'y',
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        display: false
                                    },
                                    ticks: {
                                        stepSize: 10
                                    }
                                },
                                x: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 1
                                    }
                                }
                            }
                        }} className={styles.bar} />
                    </div>
                )}
            </div>
        </>
    );
};

export default DashboardView;
