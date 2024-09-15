import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Button } from 'antd';
import { HomeOutlined, FileOutlined, TeamOutlined, OrderedListOutlined, BellOutlined } from '@ant-design/icons'
import { FaCircleUser } from "react-icons/fa6";
import logo from "../../../public/logo.svg";
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';

const HomeAluno = () => {
  const navigate = useNavigate();

  // Funções de navegação
  const handleUpdateProfile = () => {
    navigate('/aluno/atualizar-dados');
  };

  const handleViewEditais = () => {
    navigate('/aluno/editais');
  };

  const handleViewMonitores = () => {
    navigate('/aluno/monitores-disponiveis');
  };

  const handleAcompanharSelecao = () => {
    navigate('/aluno/acompanhar-selecao');
  };

  const sidemenuItems = [
    <SidemenuItem icon={<HomeOutlined />} label="Home" />,
    <SidemenuItem icon={<FileOutlined />} label="Novos Editais" />,
    <SidemenuItem icon={<TeamOutlined />} label="Monitores" />,
    <SidemenuItem icon={<OrderedListOutlined />} label="Seleção" />
  ]

  const headerButtons = [
    <>
      <Button
        type="link"
        className="text-white hover:text-gray-300"
        icon={ <BellOutlined style={{ fontSize:'20px' }} /> }
        onClick={null}
      >
      </Button>
      <Button
        type="link"
        className="text-white hover:text-gray-300"
        icon={ <FaCircleUser className='w-6 h-6' /> }
        onClick={null}
      >
      </Button>
    </>
  ]

  return (
    <>
    <div className="bg-white h-screen w-screen flex flex-col">
    <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons} />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-3xl px-6">

          {/* Logo e título */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4">
            <Image
              src={logo}
              preview={false}
              width={150}
              style={{ filter: 'brightness(0) saturate(100%) invert(0%)' }} />
            <div className="mt-4 sm:mt-0 text-center sm:text-left">
              {/* Título da página */}
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
                Bem-vindo, Alun@!
              </h1>
              {/* Descrição sobre as opções disponíveis */}
              <p className="mt-2 text-base sm:text-lg leading-7 text-gray-600">
                Utilize o ProMonitor para gerenciar seu perfil, visualizar editais,
                encontrar monitores disponíveis e acompanhar o processo de seleção.
              </p>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6 sm:justify-center">

            {/* Botão para Atualizar Perfil */}
            <button
              onClick={handleUpdateProfile}
              className="w-full sm:w-60 h-auto rounded-md bg-blue-600 px-6 py-3 text-base sm:text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Atualizar Perfil
            </button>

            {/* Botão para Visualizar Editais */}
            <button
              onClick={handleViewEditais}
              className="w-full sm:w-60 h-auto rounded-md bg-blue-600 px-6 py-3 text-base sm:text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Visualizar Editais
            </button>

            {/* Botão para Visualizar Monitores Disponíveis */}
            <button
              onClick={handleViewMonitores}
              className="w-full sm:w-60 h-auto rounded-md bg-blue-600 px-6 py-3 text-base sm:text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Monitores Disponíveis
            </button>

            {/* Botão para Acompanhar Seleção */}
            <button
              onClick={handleAcompanharSelecao}
              className="w-full sm:w-60 h-auto rounded-md bg-blue-600 px-6 py-3 text-base sm:text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Acompanhar Seleção
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomeAluno;
