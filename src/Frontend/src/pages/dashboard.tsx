import React, { useState, useEffect } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  listarChamadosPorCategoriaEStatus,
  listarCategorias,
  listarTodosChamadosPorCategoria,
} from "../functions/dashboard/dash";
import Sidebar from "../component/sidebar/sidebar";
import styles from "../component/dashboard/dashboard.module.css";

interface ICategoriaView {
  cat_id: number;
  cat_titulo: string;
}

interface IChamadoPorCategoria {
  cat_titulo: string;
  cha_status: string;
  total: number;
}

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // Mova a função getRandomColor para antes do uso
// const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// };

const getBlueColor = [
  "rgba(83, 82, 188, 1)",
  "rgba(16, 15, 92, 1)",
  "rgba(41, 39, 226, 1)",
  "rgba(0, 0, 128, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(30, 144, 255, 1)",
  "rgba(135, 206, 235, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(131, 111, 255, 1)",
  "rgba(173, 216, 230, 1)",
  "rgba(65, 105, 225, 1)",
];

const DashboardView: React.FC = () => {
  const [categorias, setCategorias] = useState<ICategoriaView[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState< number | null >(null);
  const [chamadosPorStatus, setChamadosPorStatus] = useState< { cha_status: string; total: number }[] >([]);
  const [todosChamadosPorCategoria, setTodosChamadosPorCategoria] = useState< IChamadoPorCategoria[] >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await listarCategorias();
        if (response.success) {
          setCategorias(response.categorias);
          setLoading(false);
          setError("");
          return true;
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
    fetchTodosChamados();
  }, []);

  const fetchTodosChamados = async () => {
    try {
      const response = await listarTodosChamadosPorCategoria(dataInicial, dataFinal);
      if (response.success) {
        console.log('resposta', response.data)
        setTodosChamadosPorCategoria(response.data);
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

  const fetchChamadosPorCategorias = async (cat_id: number | null, dataInicial: string, dataFinal: string) => {
    if (cat_id) {
      const response = await listarChamadosPorCategoriaEStatus(
        cat_id,
        dataInicial,
        dataFinal
      );
      if (response.success) {
        setChamadosPorStatus(response.chamadosPorStatus);
      } else {
        setError("Erro ao carregar os chamados por status");
      }
    } else {
      return ('Categoria não selecionada')
    } 
  };

  const handleCategoriaChange = async (cat_id: string) => {
    if (cat_id === "todas") {
      setCategoriaSelecionada(null);
    } else {
      setCategoriaSelecionada(Number(cat_id));
    }
  };

  useEffect(() => {
    if (!categoriaSelecionada) {
      fetchTodosChamados()
    }
    else {
      fetchChamadosPorCategorias(categoriaSelecionada, dataInicial, dataFinal)
    }
  }, [dataFinal]);

  useEffect(() => {
    if (!categoriaSelecionada) {
      fetchTodosChamados()
    }
    else {
      fetchChamadosPorCategorias(categoriaSelecionada, dataInicial, dataFinal)
    }
  }, [categoriaSelecionada]);

  const dataPorCategoria = {
    labels: todosChamadosPorCategoria.map((itens) => itens.cat_titulo),
    datasets: [
      {
        label: "Chamados",
        data: todosChamadosPorCategoria.map((itens2) => itens2.total),
        backgroundColor: getBlueColor,
        borderColor: getBlueColor,
        borderWidth: 1,
        barThickness: 45,
      },
    ],
  };

  const data = {
    labels: chamadosPorStatus.map((chamado) => chamado.cha_status),
    datasets: [
      {
        label: "Chamados",
        data: chamadosPorStatus.map((chamado) => chamado.total),
        backgroundColor: chamadosPorStatus.map((chamado, index) =>
          index === 0
            ? "rgba(83, 82, 188, 1)"
            : index === chamadosPorStatus.length - 1
            ? "rgba(16, 15, 92, 1)"
            : "rgba(41, 39, 226, 1)"
        ),
        borderColor: chamadosPorStatus.map((chamado, index) =>
          index === 0
            ? "rgba(83, 82, 188, 1)"
            : index === chamadosPorStatus.length - 1
            ? "rgba(16, 15, 92, 1)"
            : "rgba(41, 39, 226, 1)"
        ),
        borderWidth: 1,
        barThickness: 60,
      },
    ],
  };

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <h2 className={styles.title}>Relatórios de Tickets</h2>
        {loading && <p>Carregando...</p>}
        <div className={styles.selectContainer}>
          <select
            className={styles.select}
            onChange={(e) => handleCategoriaChange(e.target.value)}
          >
            <option disabled value="">
              Selecione uma Categoria
            </option>
            <option value="todas">Todas as Categorias</option>
            {categorias.map((categoria) => (
              <option key={categoria.cat_id} value={categoria.cat_id}>
                {categoria.cat_titulo}
              </option>
            ))}
          </select>
          <input
            className={styles.dataSelect}
            type="text"
            placeholder="Data de início"
            name="dataInicio"
            onFocus={(event) => (event.target.type = "date")}
            onChange={(e) => setDataInicial(e.target.value)}
          />
          <input
            className={styles.dataSelect}
            type="text"
            placeholder="Data de final"
            name="dataFinal"
            onFocus={(event) => (event.target.type = "date")}
            onChange={(e) => setDataFinal(e.target.value)}
            disabled={!dataInicial}
          />
        </div>
        {categoriaSelecionada === null && (
          todosChamadosPorCategoria.length > 0 ? (
            <div className={styles.containerbar}>
              <h2 className={styles.texto}>Todas as Categorias</h2>
              <Bar
                data={dataPorCategoria}
                options={{
                  indexAxis: "y",
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: false,
                      },
                    },
                    x: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
                className={styles.bar}
              />
            </div>
          ): 
          <div className={styles.mensagemErro}>
            <p> Nenhum chamado foi encontrado</p>
          </div>)}
        {categoriaSelecionada && chamadosPorStatus.length > 0 && (
          <div className={styles.containerbar}>
            <h2 className={styles.texto}>
              {
                categorias.find(
                  (categoria) => categoria.cat_id === categoriaSelecionada
                )?.cat_titulo
              }
            </h2>
            <Bar
              data={data}
              options={{
                indexAxis: "y",
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      stepSize: 10,
                    },
                  },
                  x: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
              className={styles.bar}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardView;
