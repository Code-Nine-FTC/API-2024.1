import Sidebar from "../component/sidebar/sidebar"
const userLogado = "admin"

const Home = () => {
    return (
        <>
            <Sidebar userTipo={userLogado}/>

        </>
    )
}

export default Home