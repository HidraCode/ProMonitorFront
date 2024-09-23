import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  HomeOutlined, FilePdfOutlined, UploadOutlined, FileAddOutlined, 
  FileOutlined, OrderedListOutlined, BellOutlined, EditOutlined, 
  CalendarOutlined, DownloadOutlined, TeamOutlined 
} from "@ant-design/icons";
import { FaCircleUser } from "react-icons/fa6"; 
import { Button, Col, Row, Spin } from 'antd';
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';
import BackButton from '../../components/layout/BackButton';
import MonitorCard from '../../components/MonitorCard';

const VisualizarAtividade = () => {
  const { codigo_usuario } = useParams(); // Pega o código do usuário pela URL
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Requisição à API para buscar as atividades
  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/professores/tarefas/${codigo_usuario}`);
        const data = await response.json();
        setAtividades(data); // Armazena as atividades no estado
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar as atividades:", error);
        setLoading(false);
      }
    };
    
    fetchAtividades();
  }, [codigo_usuario]);

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
      />
      <Button
        type="link"
        className="text-white hover:text-gray-300"
        icon={<FaCircleUser className="w-6 h-6" />}
      />
    </>
  ];

  if (loading) {
    return <Spin tip="Carregando atividades..." />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons} />
      <BackButton path={"/professor/atividades"} />

      <div className="flex flex-col items-center justify-start flex-grow bg-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-custom-blue">Atividades</h2>
        </div>

        {/* Exibe as atividades */}
        {atividades.map((atividade) => (
          <div key={atividade.id} className="mb-6 w-3/6">
            <Row className="text-xl flex justify-start items-center pb-3">{atividade.titulo}</Row>
            <Row className="flex justify-start items-center">{atividade.descricao}</Row>
            <Row className="font-semibold pt-3 flex justify-start items-center">
              <Col>
                <FilePdfOutlined />
              </Col>
              <Col>Anexo:</Col>
              <Col className="pl-4">
                <Button 
                  size="small"
                  icon={<DownloadOutlined />}
                  href={atividade.anexo} // Link para o anexo
                  className="bg-custom-blue text-white"
                >
                  Baixar anexos
                </Button>
              </Col>
            </Row>
            <Row className="flex justify-start items-center py-3">
              <Col className="text-base text-gray-500">
                <TeamOutlined />
              </Col>
              <Col className="pl-2 text-base text-gray-500">Resposta dos monitores:</Col>
            </Row>
            <div className="w-1/2">
              <Row className="h-10 bg-custom-blue">
                <Col span={12} className="flex items-center justify-center text-white">Monitor</Col>
                <Col span={7} className="flex items-center justify-center text-white">Data de submissão</Col>
                <Col span={5} className="flex items-center justify-center text-white">Anexos</Col>
              </Row>
              {/* Exibe respostas dos monitores */}
              {atividade.respostas.map((resposta) => (
                <MonitorCard key={resposta.id} nome={resposta.monitor} data={resposta.data_submissao} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizarAtividade;
