import React from "react";
import styles from "../Funcionario/ViewFuncionario.module.css"
import { Link } from "react-router-dom";
interface DetalhesClienteProps {
  cliente: {
    cli_id: string,
    cli_nome: string;
    cli_cpf: string
    cli_email: string;
    ativo: boolean;
  }
}

function DetalhesCliente({ cliente}: DetalhesClienteProps) {
  return (
    <>
    <div className={styles.global}>
      <div className={styles.title}>
        <br></br>
        <h1 className={styles.tipofuncionario}>{cliente.cli_nome}</h1>
        <br></br>
        <hr className={styles.linha}></hr>
      </div>

      <div className={styles.containermaior}>
        <span className={styles.containerspanidentificacao}>
        </span>
        <div className={styles.cotainerinfo}>
          <h3 className={styles.email}>E-mail: {cliente.cli_email}</h3>
          <h3 className={styles.email}>CPF: {cliente.cli_cpf}</h3>
        </div>

      </div>
      <div className={styles.containerbotao}>
          <Link to='/editarcliente' className={styles.button}>Editar</Link>
          <Link to='/' className={styles.button}>Voltar</Link>
      </div>
    </div>
    </>
  );
}

export default DetalhesCliente