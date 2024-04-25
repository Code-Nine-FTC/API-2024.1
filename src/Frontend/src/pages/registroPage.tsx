const Registro = () => {
    return (
        <>
        <section className='container'>
            <section className="bemvindo">
                <h1>Bem-vindo !</h1>
                <p>Já tem uma conta ? Faça login no sistema para obter o suporte necessário. </p>
                <button>Entre !</button>
            </section>
            <section className="form">
                <h1>Criar Nova Conta</h1>
                <form action ='' method="POST">
                    <label>Nome Completo:</label><br></br>
                    <input type="text" id='nome' name="nome" required></input><br></br>

                    <label>Seu E-mail:</label><br></br>
                    <input type="email" id="email" name="email" required></input><br></br>

                    <label>Seu CPF:</label><br></br>
                    <input type="text" id="cpf" name="cpf" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" placeholder="000.000.000-00" required></input><br></br>

                    <label>Senha:</label>
                    <input type='password' id='senha' name="senha" required></input><br></br>

                    <label>Confirmar Senha:</label>
                    <input type="password" id="confirmarsenha" name="senha" required></input><br></br>

                    <button>Confirmar</button>
                </form>
            </section>
        </section>
        </>
    )
}

export default Registro