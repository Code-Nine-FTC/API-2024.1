import React from 'react';

export const AuthContext = React.createContext({
  isAutenticado: false,
  nivelAcesso: '',
  token: '',
  setAutenticado: (status: boolean) => {},
  setNivelAcesso: (level: string) => {},
  setToken: (token: string) => {},
});