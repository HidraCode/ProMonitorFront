import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './src/pages/auth/cadastro/Signup';
import Login from './src/pages/auth/login/Login';
import RecuperarSenha from './src/pages/auth/login/RecuperarSenha';
import VerificarCodigo from './src/pages/auth/login/VerificarCodigo';
import RedefinirSenha from './src/pages/auth/login/RedefinirSenha';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/api/auth/signup' element={<Signup />} />
        <Route path='/api/auth/login' element={<Login />} />
        <Route path='/api/auth/pass-recovery' element={<RecuperarSenha />} />
        <Route path='/api/auth/pass-recovery/verify-code' element={<VerificarCodigo />} />
        <Route path='/api/auth/pass-reset' element={<RedefinirSenha />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;