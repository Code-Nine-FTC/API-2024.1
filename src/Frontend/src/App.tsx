import React from 'react';
import logo from './logo.svg';
import './global.css';
import Routes from './rotas/rotas'
import axios from 'axios';


function App() {
  axios.interceptors.request.use((request) => {
    console.log('Request:', request);
    return request;
  });

  // Logging response interceptor
  axios.interceptors.response.use((response) => {
    console.log('Response:', response);
    return response;
  }, (error) => {
    console.error('Error:', error);
    throw error;
  });
  return (
    <div className="divtotal">
      <Routes />
    </div>
  );
}

export default App;
