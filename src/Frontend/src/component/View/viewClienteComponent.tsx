import React from "react";
import styles from "./ViewFuncionario.module.css"
interface DetalhesClienteProps {
  cliente: {
    cli_id: string,
    cli_nome: string;
    cli_email: string;
    ativo: boolean;
  };
  navigate: (path: string) => void;
}

function DetalhesCliente({ cliente, navigate }: DetalhesClienteProps) {
  return (
    <>
    <div className={styles.global}>
      <div className={styles.title}>
        <br></br>
        <h1 className={styles.tipofuncionario}>Detalhes do Funcionário</h1>
        <br></br>
        <hr className={styles.linha}></hr>
      </div>

      <div className={styles.containermaior}>
        <span className={styles.containerspanidentificacao}>
          <h2 className={styles.funcionaroid}>ID: {cliente.cli_id}</h2>
        </span>
        <div className={styles.cotainerinfo}>
          <h3 className={styles.nome}>Nome: {cliente.cli_nome}</h3>
          <h3 className={styles.email}>E-mail: {cliente.cli_email}</h3>
          <h3 className={styles.ativo}>Ativo: {cliente.ativo ? 'Ativo' : 'Desativado'}</h3>

        </div>

      </div>
      <div className={styles.containerbotao}>
            <button className={styles.button} onClick={() => navigate(`/editarcliente/${cliente.cli_id}`)}>Editar</button>
            <button className={styles.button} onClick={() => navigate(`/`)}>Voltar</button>
      </div>
    </div>
    </>
  );
}

export default DetalhesCliente