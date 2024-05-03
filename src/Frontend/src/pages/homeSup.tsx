import Sidebar from "../component/sidebar/sidebar"
import Status from '../component/status/status';
import styles from '../component/homeSup/HomeSuporte.module.css'
import Textostatus from "../component/textostatus/textostatus";
const userLogado = 'atendente'


const HomeSup = () =>{
    return(
        <>
            <Sidebar/>
            <div className={styles.container}>
                <header className={styles.title}>
                    <h1>Bem-Vindo !</h1>
                    <br></br>
                    <p>Seus Tickets apareceram aqui.</p>
                    <br></br>
                    <br></br>
                    <hr className={styles.linha}></hr>   
                </header>
                <br></br>
                <div className={styles.conteudo}>                
                <div className={styles.status}>
                    <Textostatus/>
                    <br></br>
                    <Status/>
                </div>
                </div>
            </div>

        </>
    )
}

export default HomeSup