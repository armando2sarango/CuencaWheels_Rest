import React from 'react';
import './App.css';
import ConfigRouter from './services/configRouter';
import { useActivityTimeout } from './services/auth'; 

function App() {
  const actionOnExpire = () => {
    alert("Tu sesión ha expirado por inactividad.");
    window.location.href = '/'; 
  };
  useActivityTimeout(10 * 60 * 1000, actionOnExpire);
  return <ConfigRouter />;
}

export default App;
