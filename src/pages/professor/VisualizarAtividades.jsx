import React from 'react';
import { Row } from 'antd';
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';
import BackButton from '../../components/layout/BackButton';
import AtividadeCard from '../../components/AtividadeCard';

const VisualizarAtividades = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader logoColor={null} sideMenu={<Sidemenu items={null} />} buttons={null} />
      <BackButton path={"/professor"} />

      <div className="flex flex-col items-center justify-start flex-grow bg-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-custom-blue">Atividades Atribuidas</h2>
        </div>
        <div className='w-8/12'>
          <AtividadeCard 
            titulo={"Revisar material de Teoria dos Conjuntos"}
            conteudo={"Nesta tarefa, você deve revisar todo o material relacionado a Teoria dos Conjuntos, garantindo que todos os conceitos estejam bem compreendidos e que você seja capaz de aplicar as definições e propriedades em diferentes contextos."}
            tipo={'tarefa'}
            professor={"Gabriel Cisneiros"}
            anexos={true}
            data={"10/02/2024"}
          />
        </div>
      </div>
    </div>
  );
};

export default VisualizarAtividades;