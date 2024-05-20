import Sidebar from "../component/sidebar/sidebar"
import styles from '../component/envioticket/EnvioTicket.module.css'
import React, { useState } from "react"
import axios from "axios"
import { rotaBase } from "../functions/RotaBase/rotaBase"
import api from "../services/api"





const Ticket = () => {

const [titulo, setTitulo] = useState<string>('');
const [descricao, setdescricao] = useState<string>('');
const [number, setnumber] = useState<number>();

    const [dadosChamado, setdadosChamado] = useState({
        cha_titulo: titulo,
        cha_descricao: descricao,
        cat_id: number,
    })
    const handleInputChange = (evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setdadosChamado({
            ...dadosChamado,
            [evento.target.name]: evento.target.value
        });
    };
    
    
    
    const enviarTicket = (evento: React.FormEvent<HTMLFormElement>) => {
        try {
            const token = localStorage.getItem('token')
            evento.preventDefault()
          api.post(`${rotaBase}/cadastroChamado`, dadosChamado)
              .then(() => {
                  alert('Dados salvos com sucesso')
              })
              console.log('enviar os dados')
        } catch (error) {
            
        }
       
    }


    return (
        <>
            <Sidebar />
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>Envie sua solicitação</h1>
                    <p>Não importa se for problema ou dúvida, responderemos em até 24hrs.</p>
                    <br></br>
                    <br></br>
                    <hr className={styles.linha}></hr>
                </header>
                <form className={styles.form} onSubmit={enviarTicket} >
                    <div>
                        <br></br>
                        <select className={styles.seletor} value={dadosChamado.cat_id} onChange={handleInputChange} name="cat_id" required>
                            <option disabled selected>Selecione o tópico desejado</option>
                            <option value="1">Rastreio de Pacote</option>
                            <option value="2">Perda do Código de Rastreio</option>
                            <option value="3">Danos à Encomenda</option>
                            <option value="4">Outros</option>
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
                        <textarea className={styles.textarea} value={dadosChamado.cha_descricao} onChange={handleInputChange} id="campo2" name="cha_descricao" maxLength={1000} rows={4} placeholder="Descreva seu problema aqui..." required></textarea>
                    </div>
                    <br></br>
                    <div>
                        <div id={styles.Editar}>
                            <button type="submit">Enviar</button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}


export default Ticket