import Sidebar from "../component/sidebar/sidebar"
import styles from '../component/chamadoAdm/chamadoAdm.module.css'

const TicketAdm = () => {
    
    return(
    <>
        <Sidebar/>
        <div className={styles.container}>
            <header className={styles.title}>
                <h1>Criar categorias</h1>
                
                <br></br>
                <br></br>
                <hr className={styles.linha}></hr>   
            </header>
            <form className={styles.form}>
                <div>
                    <br></br>
                    <input className={styles.seletor} type="text" id="campo1" name="campo1" maxLength={25} placeholder="Título da categoria" required></input><br></br>
                </div>
                <br></br>
                <div>
                    <br></br>
                    <select className={styles.seletor} required>
                        <option disabled selected>Horário</option>
                        <option value="valor1">08:00-12:00</option>
                        <option value="valor2">12:00-16:00</option>
                        <option value="valor3">16:00-20-00</option>
                    </select>
                </div>
                <br></br>
                <div>
                    <br></br>
                    <select className={styles.seletor} required>
                        <option disabled selected>Prioridade</option>
                        <option value="valor1">Alta</option>
                        <option value="valor2">Média</option>
                        <option value="valor3">Baixa</option>
                    </select>
                </div>
                <br></br>
                <div className={styles.buttonsContainer}>
                    <div id={styles.Editar}>
                        salvar
                    </div>
                    <div id={styles.OutroBotao}>
                        cancelar
                    </div>
                </div>
            </form>
        </div>
    
    </>
    )
}

export default TicketAdm 
