import React from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/layout/AppHeader"
import Sidemenu from "../../components/layout/Sidemenu";
import SidemenuItem from "../../components/layout/SidemenuItem";
import { Button } from "antd";
import { HomeOutlined, EditOutlined, FileAddOutlined, OrderedListOutlined, FileOutlined, UploadOutlined, BellOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FaCircleUser } from "react-icons/fa6";
import logo from "../../../public/logo.svg";
import { Image } from 'antd';

const HomeProfessor = () => {
  const navigate = useNavigate();

  // Funções de navegação
  const handleAnalises = () => {
    navigate('/professor/analises');
  };

  const handleViewAtribuicoes = () => {
    navigate('/professor/atribuir');
  };

  const handleLancarEdital = () => {
    navigate('/professor/criar-edital');
  };

  const sidemenuItems = [
    <SidemenuItem icon={<HomeOutlined />} path={"/professor"} label="Home" />,
    <SidemenuItem icon={<EditOutlined />} path={"/professor/analises"} label="Análises" />,
    <SidemenuItem icon={<FileAddOutlined />} path={"/professor/atribuir"} label="Atribuições" />,
    <SidemenuItem icon={<FileOutlined />} path={"/professor/atividades"} label={"Atividades"} />,
    <SidemenuItem icon={<OrderedListOutlined />} path={"/professor/selecao"} label="Selecionamento" />,
    <SidemenuItem icon={<UploadOutlined />} path={"/professor/criar-edital"} label="Lançar Edital" />
  ];

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
  <div className="bg-white h-screen w-screen flex flex-col">
  <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons}/>
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
                Bem-vind@, Professor(a)!
              </h1>
              {/* Descrição sobre as opções disponíveis */}
              <p className="mt-2 text-base sm:text-lg leading-7 text-gray-600">
                Utilize o ProMonitor para gerenciar seu perfil, lançar editais,
                atribuir tarefas e analisar frequências e relatórios finais.
              </p>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6 sm:justify-center">

            <button
              onClick={handleAnalises}
              className="w-full sm:w-60 h-auto rounded-md bg-blue-600 px-6 py-3 text-base sm:text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Análises
            </button>

            <button
              onClick={handleViewAtribuicoes}
              className="w-full sm:w-60 h-auto rounded-md bg-blue-600 px-6 py-3 text-base sm:text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Atribuições
            </button>

            <button
              onClick={handleLancarEdital}
              className="w-full sm:w-60 h-auto rounded-md bg-blue-600 px-6 py-3 text-base sm:text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Lançar Edital
            </button>
          </div>
        </div>
      </div>
  </div>
)
}
export default HomeProfessor