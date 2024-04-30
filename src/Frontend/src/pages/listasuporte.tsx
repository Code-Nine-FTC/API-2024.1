import React, { useState, useEffect } from 'react';
import VisualizarFuncionarios from '../functions/visualizarFunc';



const ListagemFuncionarios = () => {
    const [formDataSenha, setFormData] = useState({
    func_id: '',
    func_nome: '',
    cli_cpf: '',
    
})


  return (
    <div>
      <h2>Lista de Funcionários</h2>
      
      {/* Exibe uma mensagem de carregamento enquanto os dados estão sendo carregados */}
      {loading && <p>Carregando...</p>}
      
      {/* Exibe uma mensagem de erro caso ocorra algum erro na requisição */}
      {error && <p>{error}</p>}
      
      {/* Exibe a lista de funcionários */}
      <ul>
        {funcionarios.map(funcionario => (
          <li key={funcionario.func_id}>
            Nome: {funcionario.func_nome}, CPF: {funcionario.func_cpf}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Listar;
