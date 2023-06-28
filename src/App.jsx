import { useState, useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './utils/AppRouter'
import {ApplicationContext, ApplicationDefaultContext} from './utils/AppContext'
import AuthService from './services/AuthService';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

function App() {
  const server = import.meta.env.VITE_SERVER;
 
  useEffect(()=>{
    toast.promise(
        AuthService.ping(),
        {
          loading: 'Connecting..',
          success: <b>Connected to the server</b>,
          error: <b>Failed to Connect to the Server</b>,
        }
    );
  },[]);

  const appContext = { 
    ...ApplicationDefaultContext, 
    server,
  }

  return (
    <ApplicationContext.Provider value={appContext}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      <Toaster position="top-right" />
    </ApplicationContext.Provider>
  )
  
}

export default App
