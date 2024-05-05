import React from "react";
import styles from "./ViewFuncionario.module.css"
interface DetalhesFuncionarioProps {
  funcionario: {
    func_id: string,
    func_nome: string;
    func_cpf: string;
    func_email: string;
    ativo: boolean;
  };
  navigate: (path: string) => void;
}

function DetalhesFuncionario({ funcionario, navigate }: DetalhesFuncionarioProps) {
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
          <h2 className={styles.funcionaroid}>ID: {funcionario.func_id}</h2>
        </span>
        <div className={styles.cotainerinfo}>
          <h3 className={styles.nome}>Nome: {funcionario.func_nome}</h3>
          <h3 className={styles.cpf}>CPF: {funcionario.func_cpf}</h3>
          <h3 className={styles.email}>E-mail: {funcionario.func_email}</h3>
          <h3 className={styles.ativo}>Ativo: {funcionario.ativo ? 'Ativo' : 'Desativado'}</h3>

        </div>

      </div>
      <div className={styles.containerbotao}>
            <button className={styles.button} onClick={() => navigate(`/editarfuncionario/${funcionario.func_id}`)}>Editar</button>
            <button className={styles.button} onClick={() => navigate(`/visualizarTodosFuncionarios`)}>Voltar</button>
      </div>
    </div>
    </>
  );
}

export default DetalhesFuncionario;
