// components/dashboard/dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { listarChamadosPorCategoriaEStatus, listarCategorias } from '../functions/dashboard/dash';

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
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            }
        ]
    };

    const styles = {
        container: {
            padding: '20px'
        },
        title: {
            textAlign: 'center' as 'center',
            marginBottom: '20px'
        },
        selectContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
        },
        select: {
            padding: '10px',
            fontSize: '16px'
        },
        errorMessage: {
            color: 'red'
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Dashboard de Chamados</h2>
            {loading && <p>Carregando...</p>}
            {error && <p style={styles.errorMessage}>{error}</p>}
            <div style={styles.selectContainer}>
                <select style={styles.select} onChange={(e) => handleCategoriaChange(e.target.value)}>
                    <option value="">Selecione uma Categoria</option>
                    {categorias.map(categoria => (
                        <option key={categoria.cat_id} value={categoria.cat_id}>
                            {categoria.cat_titulo}
                        </option>
                    ))}
                </select>
            </div>
            {categoriaSelecionada && chamadosPorStatus.length > 0 && (
                <div>
                    <h2>{categorias.find(categoria => categoria.cat_id === categoriaSelecionada)?.cat_titulo}</h2>
                    <Bar data={data} />
                </div>
            )}
        </div>
    );
};

export default DashboardView;
