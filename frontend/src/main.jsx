import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import {
 BrowserRouter
} from "react-router-dom";
import { AuthProvider } from './auth/AuthProvider.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App/>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
