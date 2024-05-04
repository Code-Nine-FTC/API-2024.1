// DetalhesFuncionario.js
import React from "react";

interface DetalhesFuncionarioProps {
  id?: string;
  funcionario: {
    func_nome: string;
    func_cpf: string;
    func_email: string;
    ativo: boolean;
  };
  navigate: (path: string) => void;
}

function DetalhesFuncionario({ id, funcionario, navigate }: DetalhesFuncionarioProps) {
  return (
    <div className="container-maior">
      <span className="container-span-identificacao">
        <h2 className="tipo-funcionario">Detalhes do Funcionário</h2>
        <h2 className="funcionario-id">ID: {id}</h2>
      </span>
      <div className="container-info">
        <h3 className="info-nome-funcionario">Nome: {funcionario.func_nome}</h3>
        <h3 className="info-cpf-funcionario">CPF: {funcionario.func_cpf}</h3>
        <h3 className="info-email-funcionario">E-mail: {funcionario.func_email}</h3>
        <h3 className="info-ativo-funcionario">Ativo: {funcionario.ativo ? 'Ativo' : 'Desativado'}</h3>
      </div>
      <button onClick={() => navigate(`/editarfuncionario/${id}`)}>Editar</button>
      <button onClick={() => navigate(`/visualizarTodosFuncionarios`)}>Voltar</button>
    </div>
  );
}

export default DetalhesFuncionario;
