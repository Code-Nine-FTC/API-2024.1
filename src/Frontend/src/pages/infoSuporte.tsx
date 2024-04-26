import React, { useState, FormEvent } from 'react';
import "../component/infoSuporte/infoSuporte.css"
import ImageComponent from '../component/imagemperfil/imagemperfil';
import Sidebar from '../component/sidebar/sidebar';
const userLogado = 'getAtendenteNavigationItems'




interface User {
  nome: string;
  email: string;
  senha: string;
  tiposuport: string;
  cpf: string;
  telefone: string;
}

const Editinfosuport: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [tiposuport, setTiposuport] = useState<string>('');
  const [cpf, setCPF] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const user: User = { nome, email, senha, cpf, telefone, tiposuport };
    console.log(user);
  };
  

  return (
    
    <div className='ficacerto'>
      <div id='SidebarSuporte'>
      <Sidebar userTipo={userLogado}/>
      </div>
      <div className='titulo'>
        
        
        <h1>Editar Usuário</h1>

      </div>
      <div className='Container'>
            <div className='perfil'>
                <ImageComponent nome={nome}/>
              
            </div>
      
      
    <form className='conjunto' onSubmit={handleSubmit}>
      <div className='Dados1'>
      <label>
       
        <input className='' type="text" value={nome} placeholder='Altere seu nome' onChange={e => setNome(e.target.value)} />
      </label>
      <label>
        
        <input type="email" value={email} placeholder='Altere seu e-mail' onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
       
        <input type="password" value={senha} placeholder='Altere sua senha' onChange={e => setSenha(e.target.value)} />
      </label>
      </div>
      <div className='Dados2'>
      <label>
       
       <input className='' type="text" value={tiposuport} placeholder='Altere seu nome' onChange={e => setTiposuport(e.target.value)} />
     </label>
     <label>
       
       <input type="" readOnly value={cpf} placeholder={cpf} onChange={e => setCPF(e.target.value)} />
     </label>
     <label>
      
       <input type="tel" value={telefone} placeholder='Altere seu número de telefone' onChange={e => setTelefone(e.target.value)} />
     </label>
      </div>
      </form>
      
      <div className='button'>
            <div id='Editar'>
              Editar Perfil
            </div>
          <div id='Deletar'>
        Deletar Conta
      </div> 
      </div>
      
      </div>
      </div>

      
      
    
  );
}

export default Editinfosuport;
