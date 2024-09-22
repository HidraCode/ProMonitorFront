import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, PlusOutlined, UploadOutlined, FileAddOutlined, FileOutlined, OrderedListOutlined, BellOutlined, EditOutlined } from "@ant-design/icons"
import { FaCircleUser } from "react-icons/fa6"; 
import { Button, FloatButton } from 'antd';
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';
import BackButton from '../../components/layout/BackButton';
import AtividadeCard from '../../components/AtividadeCard';

const VisualizarAtividades = () => {

  const navigate = useNavigate()

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

  const handleNovaAtividade = () => {
    navigate("/professor/atribuir")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons} />
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
      <FloatButton  
        type='primary'
        shape='square'
        icon={<PlusOutlined />}
        onClick={handleNovaAtividade}
      />
    </div>
  );
};

export default VisualizarAtividades;