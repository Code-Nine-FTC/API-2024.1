import React, { useState, useEffect } from "react"
import Sidebar from "../component/sidebar/sidebar"
import styles from '../component/envioticket/EnvioTicket.module.css'
import api from "../services/api"
import visualizarTodasCategorias from "../functions/Tickets/ticketSearch"
import ICategoriaView from "../functions/Tickets/interface/iCategoria"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import getDate from "../functions/verData"
import EnviarMensagemFunc from "../functions/Chat/enviarMensagemFunc"
import EnviarTicket from "../functions/EnviarTicket/enviarticketfunc"

const Ticket = () => {
    const [dadosChamado, setdadosChamado] = useState({
        cha_titulo: '',
        cha_descricao: '',
        cat_id: '',
    });

    const mensagem = {
        texto: '',
        autoria: false,
        data: '',
        chamado: 0,
    }

    const [viewcategoria, setviewcategoria] = useState<ICategoriaView[]>([]);
    const natigation = useNavigate()

    useEffect(() => { 
        const fetchListarCategorias = async () => {
            try {
                const resultadoViewCategoria = await visualizarTodasCategorias();
                if (resultadoViewCategoria.success) {
                    setviewcategoria(resultadoViewCategoria.categorias);
                } else {
                    console.error("Erro ao carregar os dados das categorias");
                }
            } catch (error) {
                console.error("Erro ao carregar os dados das categorias:", error);
            }
        }
        fetchListarCategorias();
    }, []);

    const handleInputChange = (evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setdadosChamado({
            ...dadosChamado,
            [evento.target.name]: evento.target.value
        });
    };

    const enviarTicket = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        try {
            const verificaCampoVazio = Object.values(dadosChamado).some(value => 
                typeof value === 'string' && (value.trim() === "" || value.trim().length === 0)
              );
          
              if (verificaCampoVazio ) {
                Swal.fire({
                    title: 'Erro',
                    text: 'Preencha todos os campos corretamente',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
              }
        
           const resultado = await EnviarTicket(dadosChamado);
            if (resultado.success) {
                const dataAtual = getDate()
                const { hora, minuto, segundo } = dataAtual
                const data = `${hora}:${minuto}:${segundo}`
                mensagem.data = data
                mensagem.texto = dadosChamado.cha_descricao
                mensagem.chamado = resultado.chamadoId
                const resultadoMensagem = await EnviarMensagemFunc(mensagem);
                if (resultadoMensagem.success) {
                    natigation('/ticketsAtendimento')  
                Swal.fire({
                    title: "Enviado",
                    text: "O chamado foi enviado",
                    icon: "success"
                  });
                } else {
                    console.error(resultadoMensagem.message);
                }
            }
        } catch (error: any) {
            console.error("Erro ao enviar o ticket:", error);
            let errorMessage = error.message || 'Erro ao criar o chamado. Por favor, tente novamente mais tarde.';
            Swal.fire({
                title: 'Erro',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <>
            <Sidebar />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>Envie seu Ticket</h1>
                    <p>Não importa se for problema ou dúvida, responderemos em até 24hrs.</p>
                    <br></br>
                    <br></br>
                    <hr className={styles.linha}></hr>
                </header>
                <form className={styles.form} onSubmit={enviarTicket} >
                    <div>
                        <br></br>
                        <select className={styles.seletor} value={dadosChamado.cat_id} onChange={handleInputChange} name="cat_id" required>
                            <option disabled value="">Selecione o tópico desejado</option>
                            {viewcategoria.map((categoria) => (
                                <option key={categoria.cat_id} value={categoria.cat_id}>{categoria.cat_titulo}</option>
                            ))}
                        </select>
                    </div>
                    <br></br>
                    <div>
                        <br></br>
                        <input className={styles.seletor} value={dadosChamado.cha_titulo} onChange={handleInputChange} type="text" id="campo1" name="cha_titulo" maxLength={35} placeholder="Digite o título do assunto" required></input><br></br>
                    </div>
                    <br></br>
                    <div>
                        <br></br>
                        <textarea className={styles.textarea} value={dadosChamado.cha_descricao} onChange={handleInputChange} id="campo2" name="cha_descricao" maxLength={300} rows={4} placeholder="Descreva seu problema aqui... (Limite de 300 caractéres)" required></textarea>
                    </div>
                    <br></br>
                    <div>
                        <button className={styles.button} type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Ticket
