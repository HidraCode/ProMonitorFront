import React, { useState, useEffect } from 'react';
import { BellOutlined, HomeOutlined, FileOutlined, EditOutlined, FileAddOutlined, OrderedListOutlined, UploadOutlined } from '@ant-design/icons';
import { FaCircleUser } from 'react-icons/fa6';
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';
import BackButton from '../../components/layout/BackButton';
import { Col, Row, Button, Spin, Alert } from 'antd'; // Importa Spin para o loading
import AnaliseCard from '../../components/AnaliseCard';

const Analises = () => {
  // Estado para armazenar os dados e o status de carregamento/erro
  const [analises, setAnalises] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  useEffect(() => {
    const fetchAnalises = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/professores/relatorios-frequencias/1');
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
        }
        const data = await response.json();
        setAnalises(data);
      } catch (error) {
        setError(error.message); // Captura a mensagem de erro
      } finally {
        setLoading(false); // Finaliza o loading
      }
    };

    fetchAnalises();
  }, []);

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
        icon={<BellOutlined style={{ fontSize: '20px' }} />}
        onClick={null}
      >
      </Button>
      <Button
        type="link"
        className="text-white hover:text-gray-300"
        icon={<FaCircleUser className='w-6 h-6' />}
        onClick={null}
      >
      </Button>
    </>
  ];

  // Exibe o loading ou uma mensagem de erro, se houver
  if (loading) {
    return <Spin tip="Carregando dados..." />;
  }

  if (error) {
    return <Alert message="Erro" description={error} type="error" showIcon />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons} />
      <BackButton path={"/professor/atividades"} />

      <div className="flex flex-col items-center justify-start flex-grow bg-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-custom-blue">Análises</h2>
          <div className="text-xs text-gray-700">Relatórios, frequências e requerimentos</div>
        </div>
        <div className='w-8/12'>
          <Row className='bg-custom-blue h-12'>
            <Col span={9} className='flex items-center justify-center text-white'>Monitor</Col>
            <Col span={5} className='flex items-center justify-center text-white'>Data de submissão</Col>
            <Col span={5} className='flex items-center justify-center text-white'>Status</Col>
            <Col span={5} className='flex items-center justify-center text-white'>Tipo de relatório</Col>
          </Row>

          {/* Renderiza as análises dinamicamente */}
          {analises.map((analise, index) => (
            <AnaliseCard 
              key={index}
              nome={analise.dados_form?.pdf?.nome || "Nome não disponível"}
              data={analise.data_criacao || "Data não disponível"}
              status={analise.assinatura_professor ? 'Aprovado' : 'Pendente'}
              tipo={'Relatório de Frequência'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analises;
