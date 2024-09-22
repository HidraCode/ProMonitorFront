import React from 'react';
import { Button, Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import AppHeader from "../../components/layout/AppHeader.jsx";
import Sidemenu from "../../components/layout/Sidemenu.jsx";
import SidemenuItem from "../../components/layout/SidemenuItem.jsx";
import { HomeOutlined, EditOutlined, FileAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { FrequenciaForm } from '../../components/form/FrequenciaForm.jsx';
import { enviarFrequenciaService } from '../../services/documentoService.js';
import { useParams } from 'react-router-dom';

export const FrequenciaMonitor = () => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const navigate = useNavigate();
    const { document_id } = useParams(); // Recupera o parâmetro da URL

    const sidemenuItems = [
        <SidemenuItem icon={<HomeOutlined />} path={"/monitor/home"} label="Home" />,
        <SidemenuItem icon={<EditOutlined />} path={"/monitor/relatorio"} label="Relatório final" />,
        <SidemenuItem icon={<FileAddOutlined />} path={"/monitor/frequencia"} label="Frequência mensal" />,
        <SidemenuItem icon={<LogoutOutlined />} path={"/"} label="Sair" />
    ];

    const handleFormSubmit = async (formData) => {
        const response = await enviarFrequenciaService(formData);
        console.log(response);
    };

    const handleBackToHome = () => {
        navigate("/monitor/home");
    };

    return (
        <section>
            <Row>
                <Col span={24}>
                    <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={null} />
                </Col>
            </Row>
            <section className="gap-4">
                <Button
                    type="text"
                    className={`${isSmallScreen ? 'left-2 my-2' : 'left-5'} font-medium lg:text-sm sm:text-xs justify-start`}
                    icon={<LeftOutlined />}
                    onClick={handleBackToHome}
                >
                    Voltar
                </Button>
                <Row justify="center" align="top" className="h-full">
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <h1 className={`${isSmallScreen ? 'text-xl mt-2' : 'text-3xl mt-5'} text-[#365486] font-bold`}>
                            Formulário de Frequência Mensal
                        </h1>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16} className="h-screen">
                        <FrequenciaForm role="monitor" documentId={document_id} onSubmit={handleFormSubmit} />
                    </Col>
                </Row>
            </section>
        </section>
    );
};

export default FrequenciaMonitor;
