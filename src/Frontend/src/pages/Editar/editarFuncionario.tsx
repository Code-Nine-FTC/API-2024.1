import React, { useState, FormEvent } from 'react';
import styles from "../../component/infoSuporte/InfoSuporte.module.css";
import ImageComponent from '../../component/imagemperfil/imagemperfil';
import Sidebar from '../../component/sidebar/sidebar';
import updateFuncionario from '../../functions/Editar/updateFuncionarioFunc'; 
import { useNavigate, useParams } from 'react-router-dom';
import IFuncionarioUpdate from '../../functions/Editar/Interface/IFuncionarioUpdate';
import { toast, Toaster } from 'react-hot-toast';
import deletarFuncionario from '../../functions/Editar/deletarFuncionarioFunc';
import Swal from 'sweetalert2';


function EditarFuncionario() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [nome, setNome] = useState<string>();
  const [cpf, setCPF] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [func_expediente_inicio, setFuncExpedienteInicio] = useState<string>();
  const [func_expediente_final, setFuncExpedienteFinal] = useState<string>();
  const [ativo, setAtivo] = useState<boolean>(true);
  
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
    e.preventDefault();
    if (!id) {
      navigate('/notfound');
      return
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
      const verificaCampoVazio = Object.values(dadosUpdate).some(
        (value) =>
          typeof value === "string" &&
          (value.trim() === "" || value.trim().length === 0)
      );

      if (verificaCampoVazio) {
        toast.error("Por favor, preencha todos os campos corretamente.");
        return;
      }
      const funcionarioUpdate = await updateFuncionario(func_id, dadosUpdate);
      toast.success('Alteração concluída')
    } catch (error: any) {
      console.log(`Erro ao editar Funcionario!`, error);
      toast.error('Erro ao editar funcinário: ', error.message)
    }
  };
  const handleDelete = async () => {
    if (!id) {
      navigate('/notfound');
      return
    }
    
    const func_id: number = parseInt(id, 10);
    Swal.fire({
      title: "Você tem certeza?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, desativar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resultado = await deletarFuncionario(func_id);
          if(resultado.success){
            Swal.fire({
              title: "Desativado!",
              text: "O funcionario foi desativado.",
              icon: "success"
            });
            navigate('/visualizarTodosFuncionarios')
          }
        } catch (error: any) {
            console.error("Erro ao desativar o funcionário:", error);
            let errorMessage = error.message || 'Erro ao desativar funcionário. Por favor, tente novamente mais tarde.';
            Swal.fire({
                title: 'Erro',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
      }
    });
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
          <h1>Editar Funcionário</h1>
        </div>
        <div className={styles.Container}>
          <div className={styles.perfil}>
            <ImageComponent />
          </div>
          <div className={styles.delete} onClick={handleDelete}>
              <p>Desativar</p>
          </div>
          <form className={styles.conteudoform} onSubmit={handleSubmit}>
            <div className={styles.Dados1}>
              <label> <h3 id={styles.subtitle}>Novo nome:</h3>
                <input className='' type="text" value={nome} placeholder='Digite o novo nome do usario aqui' onChange={e => setNome(e.target.value)} />
              </label>
              <label> <h3 id={styles.subtitle}>Novo E-mail:</h3> 
                <input type="email" value={email} placeholder='Digite o novo email do usuario aqui' onChange={e => setEmail(e.target.value)} />
              </label>
              <label><h3 id={styles.subtitle}>Nova senha:</h3>
                <input type="password" value={senha} placeholder='Digite a nova senha do usuario aqui' onChange={e => setSenha(e.target.value)} />
              </label>
           
              <label> <h3 id={styles.horario}>Horario de atendimento: </h3>
                <select id={styles.seletor} onChange={selecionarHorario} required>
                          <option disabled selected>Selecione um horário</option>
                          <option value="valor1">8:00 -- 16:00</option>
                          <option value="valor2">10:00 -- 18:00 </option>
                          <option value="valor3">13:00 -- 21:00</option>
                </select>
              </label>
              </div>
              <button type="submit" className={styles.customButton}>Salvar</button>
            <button className={styles.voltar} onClick={() => navigate(`/visualizarTodosFuncionarios`)}>Voltar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarFuncionario;