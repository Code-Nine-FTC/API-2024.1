import styles from './Chat.module.css'
import ticketFoto from "../../assets/chat/ticketicon.svg"
import BuscarNomeCliente from '../../functions/Chat/buscarNomeCliFunc'
import BuscarNomeAtendente from '../../functions/Chat/buscarNomeAtendFunc'
import { useEffect, useState } from 'react'
import { getNivelAcesso } from '../../services/auth'
import IChamadoView from '../../functions/Chat/IChamado'



const HeaderChat = ({ id, chamado }: { id: number; chamado: IChamadoView })  => {
    const [nomeCliente, setNomeCliente] = useState('');
    const [nomeAtendente, setNomeAtendente] = useState('');
    const userTipo = getNivelAcesso();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const clienteName = await BuscarNomeCliente(cliente);
                setNomeCliente(clienteName.name);

                const atendenteName = await BuscarNomeAtendente(atendente);
                setNomeAtendente(atendenteName.name);
            } catch (error) {
                console.error('Erro ao buscar nomes: ', error);
            }
        };
        fetchData();
    }, [cliente, atendente]);
    return (
        <>
            <header className={styles.header}>
                <div className={styles.info}>
                    <div className={styles.alinharDiv}>
                        <img className={styles.ticketFoto} src={ticketFoto} alt="Logo do Ticket"/>
                        <p className={styles.ticket}>Ticket#{id}</p>
                    </div>
                    <div className={styles.alinharInfo}>
                        {userTipo !== 'Cliente' ?(
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