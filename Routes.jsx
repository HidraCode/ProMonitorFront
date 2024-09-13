import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './src/pages/auth/cadastro/Signup.jsx';
import Login from './src/pages/auth/login/Login.jsx';
import RecuperarSenha from './src/pages/auth/login/RecuperarSenha.jsx';
import VerificarCodigo from './src/pages/auth/login/VerificarCodigo.jsx';
import LandingPage from './src/pages/LandingPage.jsx';
import EditalForm from './src/pages/professor/EditalForm.jsx';
import AlterarDadosAluno from './src/pages/student/AlterarDadosAluno.jsx';
import EditaisDisponiveisAluno from './src/pages/student/EditaisDisponiveisAluno.jsx';
import MonitoresDisponiveisAluno from './src/pages/student/MonitoresDisponiveisAluno.jsx';
import HomeStudent from './src/pages/student/HomeStudent.jsx';
import AcompanharSelecao from './src/pages/student/AcompanharSelecao.jsx';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/password-recovery" element={<RecuperarSenha />} />
        <Route path="/auth/password-recovery/verify-code" element={<VerificarCodigo />} />
        {/* <Route path='/auth/pass-reset' element={<RedefinirSenha />} /> */}
        <Route path="/student/Home" element={<HomeStudent />} />
        <Route path="/student/update-data" element={<AlterarDadosAluno />} />
        <Route path="/student/editais" element={<EditaisDisponiveisAluno />} />
        <Route path="/student/monitores-disponiveis" element={<MonitoresDisponiveisAluno />} />
        <Route path="/student/acompanhar-selecao" element={<AcompanharSelecao />} />
        <Route path="/professor/create-edital" element={<EditalForm />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
