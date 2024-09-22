import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import { Col, Divider, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';
import Tarefas from '../../components/monitor/Tarefas';
import TarefasChart from '../../components/monitor/TarefasChart';
import MateriaisDeApoio from '../../components/monitor/MateriaisDeApoio.jsx';
import AppHeader from "../../components/layout/AppHeader"
import Sidemenu from "../../components/layout/Sidemenu";
import SidemenuItem from "../../components/layout/SidemenuItem";
import { Button } from "antd";
import { HomeOutlined, EditOutlined, FileAddOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { FaCircleUser } from "react-icons/fa6";
import { getMonitorTarefasService } from '../../services/monitorService.js'

export const HomeMonitor = () => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const isMediumScreen = useMediaQuery({ query: '(max-width: 1024px)' });
    const [tarefas, setTarefas] = useState(null);

    const sidemenuItems = [
        <SidemenuItem icon={<HomeOutlined />} path={"/monitor/home"} label="Home" />,
        <SidemenuItem icon={<EditOutlined />} path={"/monitor/relatorio"} label="Relatório final" />,
        <SidemenuItem icon={<FileAddOutlined />} path={"/monitor/frequencia"} label="Frequência mensal" />,
        <SidemenuItem icon={<LogoutOutlined />} path={"/"} label="Sair" />
    ];

    // Função para buscar dados da API e salvar o resultado no sessionStorage
    const getData = async () => {
        try {
            const response = await getMonitorTarefasService();
            const tarefas = Array.isArray(response.data) ? response.data.map(({ arquivo_aux, ...tarefaSemArquivo }) => tarefaSemArquivo) : [];
            setTarefas(tarefas);
            sessionStorage.setItem('tarefas', JSON.stringify(tarefas));
            console.log('Tarefas armazenadas no sessionStorage:', tarefas);
        } catch (error) {
            console.error(error.message);
        }
    };
    

    // useEffect para carregar os dados do sessionStorage ou da API
    useEffect(() => {
        const cachedTarefas = sessionStorage.getItem('tarefas');

        if (cachedTarefas) {
            setTarefas(JSON.parse(cachedTarefas));
        } else {
            getData(); // Busca os dados da API se não estiverem no cache
        }
    }, []);

    return (
        <Layout>
            <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={null} />
            <Content
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: 'white',
                    paddingLeft: isSmallScreen ? '15px' : isMediumScreen ? '50px' : '100px',
                    paddingRight: isSmallScreen ? '15px' : isMediumScreen ? '50px' : '100px',
                    paddingTop: isSmallScreen ? '30px' : '50px',
                }}
            >
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                    <Row gutter={[16, 24]} align="stretch">
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Divider verticalMarginInline={0} style={{ borderColor: '#D3D3D3' }}/>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Tarefas data={tarefas} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Divider verticalMarginInline={0} style={{ borderColor: '#D3D3D3' }}/>
                        </Col>
                        <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                            <TarefasChart data={tarefas} />
                        </Col>
                        <Col xs={0} sm={0} md={1} lg={1} xl={1}>
                            <Divider type='vertical' className='h-full' style={{ borderColor: '#D3D3D3' }}/>
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                            <MateriaisDeApoio data={tarefas} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Divider verticalMarginInline={0} style={{ borderColor: '#D3D3D3' }}/>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default HomeMonitor;
