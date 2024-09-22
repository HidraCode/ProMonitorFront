import { Row, Col, Button, Tag, Divider } from 'antd';
import { LeftOutlined, FileOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppHeader from "../../components/layout/AppHeader"
import Sidemenu from "../../components/layout/Sidemenu";
import SidemenuItem from "../../components/layout/SidemenuItem";
import { HomeOutlined, EditOutlined, FileAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { getAnexosTarefaService, getTarefaService } from '../../services/monitorService';

import { useMediaQuery } from 'react-responsive';

const MaterialDetalhes = () => {
    const { codigo_tarefa } = useParams(); // Recupera o parâmetro da URL
    const [materialDeApoio, setMaterialDeApoio] = useState(null);
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

    const sidemenuItems = [
        <SidemenuItem icon={<HomeOutlined />} path={"/monitor/home"} label="Home" />,
        <SidemenuItem icon={<EditOutlined />} path={"/monitor/relatorio"} label="Relatório final" />,
        <SidemenuItem icon={<FileAddOutlined />} path={"/monitor/frequencia"} label="Frequência mensal" />,
        <SidemenuItem icon={<LogoutOutlined />} path={"/"} label="Sair" />
    ];

    useEffect(() => {
        const storedMaterial = sessionStorage.getItem(`materialDeApoio_${codigo_tarefa}`);

        if (storedMaterial) {
            setMaterialDeApoio(JSON.parse(storedMaterial)); // Recupera dados do sessionStorage
        } else {
            const getMaterialDeApoio = async () => {
                try {
                    const response = await getTarefaService(codigo_tarefa);
                    setMaterialDeApoio(response.data);
                    const { arquivo_aux, ...tarefaSemArquivoAux } = response.data; // Desestruturando e omitindo arquivo_aux
                    sessionStorage.setItem(`materialDeApoio_${codigo_tarefa}`, JSON.stringify(tarefaSemArquivoAux)); // Armazenando a tarefa sem a propriedade arquivo_aux
                } catch (error) {
                    console.error('Erro ao obter detalhes da tarefa:', error.message);
                }
            };

            getMaterialDeApoio();
        }
    }, [codigo_tarefa]);

    const handleDownload = async () => {
        try {
            const arquivo = await getAnexosTarefaService(codigo_tarefa);
            console.log(arquivo)
            const url = window.URL.createObjectURL(new Blob([arquivo.data]));
            const a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', `material_${codigo_tarefa}.pdf`);
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Erro ao baixar o arquivo:', error);
        }
    };

    const handleBackToLogin = () => {
        navigate('/monitor/home')
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
                    onClick={handleBackToLogin} // Adiciona o redirecionamento ao clicar
                >
                    Voltar
                </Button>
                {/* Para impedir que renderize quando a materialDeApoio = null */}
                {materialDeApoio && (
                    <Row justify="center" align="top" className="h-full" gutter={[0, 4]}>
                        <Col xs={20} sm={20} md={16} lg={16} xl={16} justify="center">
                            <section>
                                <h1 className={`${isSmallScreen ? 'text-xl mt-2' : 'text-3xl mt-5'} text-[#365486] font-bold`}>Material de apoio: {materialDeApoio.titulo}</h1>
                                {/* <div className="flex flex-col">
                                    <h2 className={`${isSmallScreen ? 'text-xs' : 'text-sm'} font-normal  text-gray-500`}>
                                        Publicado por {material.nome_professor} em {material.data_atribuicao}
                                    </h2>
                                </div> */}
                            </section>
                            <Divider verticalMarginInline={0} />
                        </Col>
                        <Col xs={20} sm={20} md={16} lg={16} xl={16} justify="center" className={`${isSmallScreen ? 'space-y-7' : 'space-y-14'}`}>
                            <section>
                                <p className={`text-gray-500 font-normal ${isSmallScreen ? 'text-sm' : 'text-base'}`}>{materialDeApoio.descricao}</p>
                            </section>
                        </Col>
                        <Col xs={20} sm={20} md={16} lg={16} xl={16} justify="center">
                            <div className='flex flex-row space-x-2 mb-2'>
                                <FileOutlined />
                                <span className='font-bold'>
                                    Anexos:
                                </span>
                            </div>
                            <Tag className='mb-1' onClick={handleDownload}>
                                anexo.pdf
                            </Tag>
                            <Divider verticalMarginInline={0} />
                        </Col>
                    </Row>
                )}
            </section>
        </section>
    );
};

export default MaterialDetalhes;
