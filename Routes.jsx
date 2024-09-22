import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './src/pages/dashboard/LandingPage.jsx';

import Login from './src/pages/auth/login/Login.jsx';
import Cadastro from './src/pages/auth/cadastro/Signup.jsx';
import RecuperarSenha from './src/pages/auth/login/RecuperarSenha.jsx';
import VerificarCodigo from './src/pages/auth/login/VerificarCodigo.jsx';

import AlterarDadosAluno from './src/pages/aluno/AlterarDadosAluno.jsx';
import EditaisDisponiveisAluno from './src/pages/aluno/EditaisDisponiveisAluno.jsx';
import MonitoresDisponiveisAluno from './src/pages/aluno/MonitoresDisponiveisAluno.jsx';
import HomeAluno from './src/pages/aluno/HomeAuno.jsx';
import AcompanharSelecao from './src/pages/aluno/AcompanharSelecao.jsx';

import CriarEdital from './src/pages/professor/CriarEdital.jsx';
import HomeProfessor from './src/pages/professor/HomeProfessor.jsx';
import AtribuirTarefa from './src/pages/professor/CriarAtividade.jsx';
import Analises from './src/pages/professor/Analises.jsx';
import VisualizarAtividades from './src/pages/professor/VisualizarAtividades.jsx';
import VisualizarAtividade from './src/pages/professor/VisualizarAtividade.jsx';
import MonitorCard from './src/components/MonitorCard.jsx';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/cadastro" element={<Cadastro />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/auth/recuperar-senha/verificar-codigo" element={<VerificarCodigo />} />
        <Route path="/aluno" element={<HomeAluno />} />
        <Route path="/aluno/atualizar-dados" element={<AlterarDadosAluno />} />
        <Route path="/aluno/editais" element={<EditaisDisponiveisAluno />} />
        <Route path="/aluno/monitores-disponiveis" element={<MonitoresDisponiveisAluno />} />
        <Route path="/aluno/acompanhar-selecao" element={<AcompanharSelecao />} />
        <Route path="/professor" element={<HomeProfessor />} />
        <Route path="/professor/criar-edital" element={<CriarEdital />} />
        <Route path="/professor/atribuir" element={<AtribuirTarefa />} />
        <Route path="/professor/analises" element={<Analises />} />
        <Route path="/professor/atividades" element={<VisualizarAtividades />} />
        <Route path="/professor/atividade/:id" element={<VisualizarAtividade />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
