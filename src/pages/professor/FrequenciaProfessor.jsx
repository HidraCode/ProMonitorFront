import React from 'react';
import { Button, Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import AppHeader from "../../components/layout/AppHeader";
import Sidemenu from "../../components/layout/Sidemenu";
import SidemenuItem from "../../components/layout/SidemenuItem";
import { HomeOutlined, EditOutlined, FileAddOutlined, OrderedListOutlined, UploadOutlined } from '@ant-design/icons';
import { FrequenciaForm } from '../../components/form/FrequenciaForm.jsx';
import { assinarFrequenciaService } from '../../services/documentoService';
import { useParams } from 'react-router-dom';

export const FrequenciaProfessor = () => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const navigate = useNavigate();
    const { document_id } = useParams(); // Recupera o parâmetro da URL

    const sidemenuItems = [
        <SidemenuItem icon={<HomeOutlined />} path={"/professor"} label="Home" />,
        <SidemenuItem icon={<EditOutlined />} path={"/professor/analises"} label="Análises" />,
        <SidemenuItem icon={<FileAddOutlined />} path={"/professor/atribuir"} label="Atribuições" />,
        <SidemenuItem icon={<OrderedListOutlined />} path={"/professor/selecao"} label="Selecionamento" />,
        <SidemenuItem icon={<UploadOutlined />} path={"/professor/criar-edital"} label="Lançar Edital" />
      ];

    const handleFormSubmit = async (formData) => {
        const response = await assinarFrequenciaService(document_id, formData);
        console.log(response);
    };

    const handleBackToHome = () => {
        navigate("/professor");
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
                            Formulário de Frequência Mensal (Professor)
                        </h1>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16} className="h-screen">
                        <FrequenciaForm role="professor" documentId={document_id} onSubmit={handleFormSubmit} />
                    </Col>
                </Row>
            </section>
        </section>
    );
};

export default FrequenciaProfessor;
