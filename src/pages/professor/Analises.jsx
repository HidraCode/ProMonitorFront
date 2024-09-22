import React from 'react';
import { BellOutlined, HomeOutlined, FileOutlined, EditOutlined, FileAddOutlined, OrderedListOutlined, UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FaCircleUser } from 'react-icons/fa6';
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';
import BackButton from '../../components/layout/BackButton';
import { Col, Row, Button } from 'antd';
import AnaliseCard from '../../components/AnaliseCard';

const Analises = () => {

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
    <BackButton path={"/professor/atividades"} />

      <div className="flex flex-col items-center justify-start flex-grow bg-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-custom-blue">Análises</h2>
          <div className="text-xs text-gray-700" >Relatórios, frequências e requerimentos</div>
        </div>
        <div className='w-8/12'>
          <Row className='bg-custom-blue h-12' >
            <Col span={9} className='flex items-center justify-center text-white' >Monitor</Col>
            <Col span={5} className='flex items-center justify-center text-white' >Data de submissão</Col>
            <Col span={5} className='flex items-center justify-center text-white' >Status</Col>
            <Col span={5} className='flex items-center justify-center text-white' >Tipo de relatório</Col>
          </Row>
          <AnaliseCard nome={"Gabriel"} data={"20/02/2004"} status={'aprovado'} tipo={'semestral'} />
        </div>
      </div> 
    </div>
  );
};

export default Analises;