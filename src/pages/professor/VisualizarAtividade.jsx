import { React } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HomeOutlined, FilePdfOutlined, UploadOutlined, FileAddOutlined, FileOutlined, OrderedListOutlined, BellOutlined, EditOutlined, CalendarOutlined, DownloadOutlined, TeamOutlined } from "@ant-design/icons"
import { FaCircleUser } from "react-icons/fa6"; 
import { Button, Col, FloatButton, Row } from 'antd';
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';
import BackButton from '../../components/layout/BackButton';
import AtividadeCard from '../../components/AtividadeCard';
import MonitorCard from '../../components/MonitorCard';

const VisualizarAtividade = () => {

  const id = useParams() // TODO substituir pelo id da atividade vindo do back-end, lembrem-se de puxar os campos equivalentes dessa atividade

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
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons} />
      <BackButton path={"/professor"} />

      <div className="flex flex-col items-center justify-start flex-grow bg-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-custom-blue">Título da Atividade</h2>
          <div className="flex justify-center items-center">
            <CalendarOutlined className="text-custom-blue" />
            <div className="pl-1 text-custom-blue">Prazo: {null}</div>
          </div>
        </div>
        <Row className="text-xl flex justify-start items-center w-3/6 pb-3" >Descrição</Row>
        <Row className="flex justify-start items-center w-3/6" >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum repudiandae repellat architecto maxime recusandae necessitatibus natus aliquid, ut debitis laborum, in enim veritatis, omnis rem ad ex delectus tenetur incidunt!</Row>
        <Row className="font-semibold pt-3 flex justify-start items-center w-3/6" >
          <Col>
            <FilePdfOutlined />
          </Col>
          <Col>
            Anexo:
          </Col>
          <Col className="pl-4">
            <Button 
              size='small'
              icon={<DownloadOutlined />}
              onClick={null}
              className='bg-custom-blue text-white'
            >
              Baixar anexos
            </Button>
          </Col>
        </Row>
        <Row className="flex justify-start items-center w-3/6 py-3" >
          <Col className='text-base text-gray-500'>
            <TeamOutlined />
          </Col>
          <Col className='pl-2 text-base text-gray-500' >
            Resposta dos monitores:
          </Col>
        </Row>
        <div className='w-1/2'>
          <Row className="h-10 bg-custom-blue">
            <Col span={12} className='flex items-center justify-center text-white'>Monitor</Col>
            <Col span={7} className='flex items-center justify-center text-white'>Data de submissão</Col>
            <Col span={5} className='flex items-center justify-center text-white'>Anexos</Col>
          </Row>
          <MonitorCard nome={"Lorem ipsum"} data={"25/08/2024"} />
        </div>
      </div>
    </div>
  );
};

export default VisualizarAtividade;