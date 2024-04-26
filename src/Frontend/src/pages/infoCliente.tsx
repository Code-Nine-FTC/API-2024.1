import React, { useState, FormEvent } from 'react';
import ".././component/infoCliente/infoCliente.css"
import ImageComponent from '../component/imagemperfil/imagemperfil';
import Sidebar from '../component/sidebar/sidebar';
const userLogado = 'getDefaultNavigationItems'



interface User {
  nome: string;
  email: string;
  senha: string;
}

const Editinfocli: React.FC = () => {
  const [nome, setNome] = useState<string>('Yuri');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const user: User = { nome, email, senha };
    console.log(user);
  };
  

  return (
    
    <div className='ficacerto'>
      <Sidebar userTipo={userLogado}/>
      <div className='titulo'>
          <h1>Minha Conta</h1>
      </div>
      <div className='Container'>
            <div className='perfil'>
                <ImageComponent nome={nome}/>
              
            </div>
      
      
    <form onSubmit={handleSubmit}>
      <div className='Dados'>
      <label>
       
        <input className='' type="text" value={nome} placeholder='Altere seu nome' onChange={e => setNome(e.target.value)} />
      </label>
      <label>
        
        <input type="email" required value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  placeholder='Altere seu e-mail' onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
       
        <input type="password" value={senha} placeholder='Altere sua senha' onChange={e => setSenha(e.target.value)} />
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

export default Editinfocli;
