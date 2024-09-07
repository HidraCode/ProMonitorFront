import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './src/pages/auth/cadastro/Signup.jsx';
import Login from './src/pages/auth/login/Login.jsx';
import RecuperarSenha from './src/pages/auth/login/RecuperarSenha.jsx';
import VerificarCodigo from './src/pages/auth/login/VerificarCodigo.jsx';
import LandingPage from './src/pages/dashboard/LandingPage.jsx';
import CriarEdital from './src/pages/professor/CriarEdital.jsx';
import AlterarDadosAluno from './src/pages/student/AlterarDadosAluno.jsx';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/password-recovery" element={<RecuperarSenha />} />
        <Route path="/auth/password-recovery/verify-code" element={<VerificarCodigo />} />
        <Route path="/student/update-data" element={<AlterarDadosAluno />} />
        <Route path="/teacher/create-edital" element={<CriarEdital />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
