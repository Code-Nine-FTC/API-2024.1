import React, { useState, FormEvent } from 'react';
import styles from "../../component/infoSuporte/InfoSuporte.module.css";
// import ImageComponent from '../component/imagemPerfil/imagemperfil';
import Sidebar from '../../component/sidebar/sidebar';
import updateFuncionario from '../../functions/Editar/updateFuncionarioFunc'; // Corrigi a importação da função de atualização
import { useNavigate, useParams } from 'react-router-dom';
import IFuncionarioUpdate from '../../functions/Editar/Interface/IFuncionarioUpdate';
import { toast, Toaster } from 'react-hot-toast';

const EditarFuncionario: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [nome, setNome] = useState<string>();
  const [cpf, setCPF] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [func_expediente_inicio, setFuncExpedienteInicio] = useState<string>();
  const [func_expediente_final, setFuncExpedienteFinal] = useState<string>();
  const [ativo, setAtivo] = useState<boolean>(true);
  const token = localStorage.getItem('token')

  const selecionarHorario = (event: any) => {
    const horario = event.target.value
    switch(horario) {
        case 'valor1':
            setFuncExpedienteInicio('08:00')
            setFuncExpedienteFinal('16:00')
            return
        case 'valor2':
            setFuncExpedienteInicio('10:00')
            setFuncExpedienteFinal('18:00')
            return
        case 'valor3':
            setFuncExpedienteInicio('13:00')
            setFuncExpedienteFinal('21:00')
            return
    }
  }

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
      const funcionarioUpdate = await updateFuncionario(func_id, dadosUpdate, token);
      toast.success('Alteração concluída')
    } catch (error) {
      console.log(`Erro ao editar Funcionario!`, error);
    }
  };

  return (
    <>
      <div><Toaster 
        position="top-center"
        reverseOrder={false}/>
        </div>
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
           
              <label> Horario de atendimento </label>
              <select onChange={selecionarHorario} required>
                        <option disabled selected>Selecione um horário</option>
                        <option value="valor1">8:00 -- 16:00</option>
                        <option value="valor2">10:00 -- 18:00 </option>
                        <option value="valor3">13:00 -- 21:00</option>
              </select>
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