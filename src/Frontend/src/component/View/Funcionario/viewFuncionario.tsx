import React from "react";
import styles from "./ViewFuncionario.module.css"
import ImageComponent from "../../imagemperfil/imagemperfil";
interface DetalhesFuncionarioProps {
  funcionario: {
    func_id: string,
    func_nome: string;
    func_cpf: string;
    func_email: string;
    ativo: boolean;
    func_is_admin: boolean;
  };
  navigate: (path: string) => void;
  nivelAcesso: string
}

function DetalhesFuncionario({ funcionario, navigate, nivelAcesso }: DetalhesFuncionarioProps) {
  return (
    <>
    <div className={styles.global}>
      <div className={styles.title}>
        <br></br>
        <h1 className={styles.tipofuncionario}>Detalhes do Funcionário</h1>
        <br></br>
        <hr className={styles.linha}></hr>
      </div>
      <span className={styles.containerspanidentificacao}>
          <h3 className={styles.funcionaroid}>ID: {funcionario.func_id}</h3>
          <h3 className={styles.ativo}>Ativo: {funcionario.ativo ? 'Ativo' : 'Desativado'}</h3>
      </span>

      <div className={styles.containermaior}>
        <div className={styles.img}>
          <ImageComponent />
        </div>
        <table className={styles.employeetable}>
          <tr>
            <td className={styles.nome}>Nome:</td>
            <td className={styles.conteudo}>{funcionario.func_nome}</td>
          </tr>
          <br></br>
          <tr>
            <td className={styles.cpf}>CPF:</td>
            <td className={styles.conteudo}>{funcionario.func_cpf}</td>
          </tr>
          <br></br>
          <tr>
            <td className={styles.email}>E-mail:</td>
            <td className={styles.conteudo}>{funcionario.func_email}</td>
          </tr>
        </table>
      </div>
      <div className={styles.containerbotao}>
      {nivelAcesso === 'administrador' ? (
        <>
        {!funcionario.func_is_admin && (
          <button className={styles.button} onClick={() => navigate(`/editarfuncionario/${funcionario.func_id}`)}>Editar</button>
        )}
          <button className={styles.button} onClick={() => navigate(`/visualizarTodosFuncionarios`)}>Voltar</button>
        </>
      ) : (
        <button className={styles.button} onClick={() => navigate(`/homesup`)}>Voltar</button>
      )}
      </div>
    </div>
    </>
  );
}

export default DetalhesFuncionario;
