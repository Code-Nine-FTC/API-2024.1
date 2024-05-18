import React from 'react';
import logo from './logo.svg';
import './global.css';
import Routes from './rotas/rotas'
import axios from 'axios';
import { isAuthenticated, getNivelAcesso, getToken } from "./services/auth";
import { useEffect, useState } from 'react';
import { AuthContext } from './services/context';

function App() {
  const [isAutenticado, setAutenticado] = useState(isAuthenticated());
  const [nivelAcesso, setNivelAcesso] = useState(getNivelAcesso() || '');
  const [token, setToken] = useState(getToken() || '');

  useEffect(() => {
    setAutenticado(isAuthenticated());
    setNivelAcesso(getNivelAcesso() || '');
    setToken(getToken() || '');
  }, [isAutenticado, nivelAcesso, token]);
  
  return (
    <AuthContext.Provider value={{ isAutenticado, nivelAcesso, token, setAutenticado, setNivelAcesso, setToken }}>
      <div className="divtotal">
        <Routes/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
