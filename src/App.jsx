import React, { useState, useEffect } from 'react';
import './App.css';
import ConfigRouter from './services/configRouter';
import { useActivityTimeout } from './services/auth';
import Loader from './components/Loader/loader';
import { setLoaderHandlers } from './utils/loaderManager';

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoaderHandlers(
      () => setLoading(true),  
      () => setLoading(false)   
    );
  }, []);
  const actionOnExpire = () => {
    alert("Tu sesión ha expirado por inactividad.");
    window.location.href = '/';
  };
  useActivityTimeout(10 * 60 * 1000, actionOnExpire);
  return (
    <>
      {loading && <Loader />}
      <ConfigRouter />
    </>
  );
}

export default App;
