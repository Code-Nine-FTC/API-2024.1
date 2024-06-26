import React, { useState, FormEvent, useEffect } from 'react';
import styles from "../../component/infoCliente/InfoCliente.module.css"
import ImageComponent from '../../component/imagemperfil/imagemperfil';
import Sidebar from '../../component/sidebar/sidebar';
import updateCliente from '../../functions/Editar/updateClienteFunc';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getToken, logout } from '../../services/auth';
import desativarCliente from '../../functions/Editar/desativarClienteFunc';
import Swal from 'sweetalert2';


const EditarCliente: React.FC = () => {
  const navigate = useNavigate()
  const [cli_nome, setNome] = useState<string>();
  const [cli_email, setEmail] = useState<string>();
  const [cli_senha, setSenha] = useState<string>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { cli_email, cli_nome, cli_senha};
    try {
      const verificaCampoVazio = Object.values(user).some(
        (value) =>
          typeof value === "string" &&
          (value.trim() === "" || value.trim().length === 0)
      );

      if (verificaCampoVazio) {
        toast.error("Por favor, preencha todos os campos corretamente.");
        return;
      }
      const token = getToken(); // Obtenha o token JWT do localStorage
      if (token) {
        await updateCliente(user);
        toast.success('Alteração concluída');
      }
    } catch (error) {
      console.log(`Erro ao editar Cliente`, error);
    }
  };



const handleDelete = async () => {
  Swal.fire({
    title: "Você tem certeza?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Não, cancelar!",
    confirmButtonText: "Sim, desativar!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = getToken();
        if (token) {
          await desativarCliente();
          logout();
          navigate('/login');
          Swal.fire({
            title: "Desativado!",
            text: "Sua conta foi desativada com sucesso",
            icon: "success"
          });
        }
      } catch (error: any) {
            console.error("Erro ao desativar a conta:", error);
            let errorMessage = error.message || 'Erro ao desativar o cliente. Por favor, tente novamente mais tarde.';
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
      <Sidebar/>
      <div className={styles.conteudo}>
      <div className={styles.titulo}>
        <h1>Minha Conta</h1>
      </div>
      <div className={styles.Container}>
        <div className={styles.perfil}>
          <ImageComponent/>
        </div>
        <div className={styles.delete} onClick={handleDelete}>
              <p>Desativar</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.Dados}>
            <label>
              <h3 id={styles.subtitle}>Altere seu nome:</h3>
              <input className='' type="text" value={cli_nome} placeholder='Altere seu nome' onChange={e => setNome(e.target.value)} />
            </label>
            <label>
            <h3 id={styles.subtitle}>Altere seu E-mail:</h3>
              <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  placeholder='Altere seu e-mail' onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
            <h3 id={styles.subtitle}>Altere sua senha:</h3>
              <input type="password" value={cli_senha} placeholder='Altere sua senha' onChange={e => setSenha(e.target.value)} />
            </label>
          </div>
          <div className={styles.button}>
          <button type="submit" id={styles.Editar}>
            Salvar
          </button>
          </div>
        </form>
        <button className={styles.voltar} onClick={() => navigate(`/visualizarCliente/`)}>Voltar</button>
        </div>
      </div>
    </>
  );
}

export default EditarCliente;
