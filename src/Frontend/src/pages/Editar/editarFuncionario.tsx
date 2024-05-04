import React, { useState, FormEvent } from 'react';
import styles from "../../component/infoSuporte/InfoSuporte.module.css";
// import ImageComponent from '../component/imagemPerfil/imagemperfil';
import Sidebar from '../../component/sidebar/sidebar';
import updateFuncionario from '../../functions/Editar/updateFuncionarioFunc'; // Corrigi a importação da função de atualização
import { useNavigate, useParams } from 'react-router-dom';
import IFuncionarioUpdate from '../../functions/Editar/Interface/IFuncionarioUpdate';

const EditarFuncionario: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [nome, setNome] = useState<string>();
  const [cpf, setCPF] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [func_expediente_inicio, setFuncExpedienteInicio] = useState<string>();
  const [func_expediente_final, setFuncExpedienteFinal] = useState<string>();
  const [ativo, setAtivo] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impedir o comportamento padrão do formulário

    if (!id) {
      navigate('/notfound');
      return;
    }

    const func_id: number = parseInt(id, 10);

    const dadosUpdate: IFuncionarioUpdate = {
      func_nome: nome,
      func_cpf: cpf,
      func_email: email,
      func_senha: senha,
      func_expediente_inicio: func_expediente_inicio,
      func_expediente_final: func_expediente_final,
      ativo: ativo
    };

    console.log(dadosUpdate);
    try {
      const funcionarioUpdate = await updateFuncionario(func_id, dadosUpdate);
      alert(funcionarioUpdate.message);
    } catch (error) {
      console.log(`Erro ao editar Funcionario!`, error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className={styles.conteudo}>
        <div className={styles.titulo}>
          <h1>Editar Usuário</h1>
        </div>
        <div className={styles.Container}>
          <div className={styles.perfil}>
            {/* <ImageComponent nome={nome}/> */}
          </div>
          <form className={styles.conteudoform} onSubmit={handleSubmit}>
            <div className={styles.Dados1}>
              <label> Novo nome:
                <input className='' type="text" value={nome} placeholder='Digite o novo nome do usario aqui' onChange={e => setNome(e.target.value)} />
              </label>
              <label> Novo E-mail:
                <input type="email" value={email} placeholder='Digite o novo email do usuario aqui' onChange={e => setEmail(e.target.value)} />
              </label>
              <label>Nova Senha:
                <input type="password" value={senha} placeholder='Digite a nova senha do usuario aqui' onChange={e => setSenha(e.target.value)} />
              </label>
           
              <label>
  Início do expediente:
  <input 
    type="number" 
    value={func_expediente_inicio} 
    placeholder='Início do expediente' 
    onChange={e => setFuncExpedienteInicio(e.target.value)} 
    min={8} max={12}
  />
</label>
<label>
  Final do expediente:
  <input 
    type="number" 
    value={func_expediente_final} 
    placeholder='Final do expediente' 
    onChange={e => setFuncExpedienteFinal(e.target.value)} 
    min={18} max={22}
  />
</label>

              </div>
            <button type="submit">Salvar</button>
            <button onClick={() => navigate(`/visualizarfuncionario/${id}`)}>Voltar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditarFuncionario;