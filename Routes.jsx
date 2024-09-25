import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './src/pages/dashboard/LandingPage.jsx';

import Login from './src/pages/auth/login/Login.jsx';
import Cadastro from './src/pages/auth/cadastro/Signup.jsx';
import RecuperarSenha from './src/pages/auth/login/RecuperarSenha.jsx';
import RedefinirSenha from './src/pages/auth/login/RedefinirSenha.jsx'
import VerificarCodigo from './src/pages/auth/login/VerificarCodigo.jsx';
import VerificarPDF from './src/pages/auth/documentos/VerificarPDF.jsx';

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
import FrequenciaProfessor from './src/pages/professor/FrequenciaProfessor.jsx';
import RelatorioProfessor from './src/pages/professor/RelatorioProfessor.jsx';


import HomeMonitor from './src/pages/monitor/HomeMonitor.jsx';
import TarefaDetalhes from './src/pages/monitor/TarefaDetalhes.jsx'
import MaterialDetalhes from './src/pages/monitor/MaterialDetalhes.jsx';
import FrequenciaMonitor from './src/pages/monitor/FrequenciaMonitor.jsx';
import RelatorioMonitor from './src/pages/monitor/RelatorioMonitor.jsx';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/cadastro" element={<Cadastro />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/auth/recuperar-senha/verificar-codigo" element={<VerificarCodigo />} />
        <Route path="/auth/redefinir-senha" element={<RedefinirSenha />} />
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
        <Route path='/professor/relatorio/:document_id' element={<RelatorioProfessor/>} />
        <Route path='/professor/frequencia/:document_id' element={<FrequenciaProfessor/>} />
        
        <Route path='/monitor/home' element={<HomeMonitor />} />
        <Route path='/monitor/tarefas/:codigo_tarefa' element={<TarefaDetalhes />} />
        <Route path='/monitor/material-de-apoio/:codigo_tarefa' element={<MaterialDetalhes/>} />
        <Route path='/monitor/frequencia' element={<FrequenciaMonitor/>} />
        <Route path='/monitor/relatorio' element={<RelatorioMonitor/>} />
        <Route path='/verificar-documento/:tipo_documento/:document_id' element={<VerificarPDF/>} />        
      </Routes>
    </Router>
  );
}

export default AppRoutes;
