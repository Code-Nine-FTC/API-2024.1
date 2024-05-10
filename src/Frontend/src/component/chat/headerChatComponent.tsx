import styles from './Chat.module.css'
import ticketFoto from "../../assets/chat/ticketicon.svg"
import BuscarNomeCliente from '../../functions/Chat/buscarNomeCliFunc'
import BuscarNomeAtendente from '../../functions/Chat/buscarNomeAtendFunc'
import { useEffect, useState } from 'react'


const HeaderChat = (id: number, atendente: number, categoria: string, cliente: number)  => {
    const [nomeCliente, setNomeCliente] = useState('');
    const [nomeAtendente, setNomeAtendente] = useState('');
    const token = localStorage.getItem('token');
    const nivel = localStorage.getItem('nivel')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const clienteName = await BuscarNomeCliente(cliente, token);
                setNomeCliente(clienteName.name);

                const atendenteName = await BuscarNomeAtendente(atendente, token);
                setNomeAtendente(atendenteName.name);
            } catch (error) {
                console.error('Erro ao buscar nomes: ', error);
            }
        };

        fetchData();
    }, [cliente, atendente, token]);
    return (
        <>
            <header className={styles.header}>
                <div className={styles.info}>
                    <div className={styles.alinharDiv}>
                        <img className={styles.ticketFoto} src={ticketFoto} alt="Logo do Ticket"/>
                        <p className={styles.ticket}>Ticket#{id}</p>
                    </div>
                    <div className={styles.alinharInfo}>
                        {nivel !== 'Cliente' ?(
                            <p>Cliente: {nomeCliente}</p>
                        ):(
                            <p>Atendente: {nomeAtendente}</p>
                        )}
                        <p>Categoria: {categoria}</p>
                    </div>                
                </div>
            </header>
        </>
    )
}
export default HeaderChat