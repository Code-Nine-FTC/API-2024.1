import Sidebar from "../component/sidebar/sidebar"
const userLogado = "admin"

const Home = () => {
    return (
        <>
            <Sidebar userTipo={userLogado}/>
            <main>
                <h1> Teste </h1>
            </main>
        </>
    )
}

export default Home