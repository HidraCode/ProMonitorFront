import { Row, Col, Button, Tag, Divider, Popconfirm } from 'antd';
import { LeftOutlined, CalendarOutlined, FileOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppHeader from "../../components/layout/AppHeader"
import Sidemenu from "../../components/layout/Sidemenu";
import SidemenuItem from "../../components/layout/SidemenuItem";
import { HomeOutlined, EditOutlined, FileAddOutlined, LogoutOutlined, UploadOutlined } from '@ant-design/icons';
import { FaCircleUser } from "react-icons/fa6";
import { getTarefaService, getAnexosTarefaService, submitTarefaService } from '../../services/monitorService';
import { useMediaQuery } from 'react-responsive';
import { message, Upload } from 'antd';
import moment from 'moment';

const TarefaDetalhes = () => {
    const { codigo_tarefa } = useParams(); // Recupera o parâmetro da URL
    const [tarefa, setTarefa] = useState(null);
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const [fileList, setFileList] = useState([]);

    const sidemenuItems = [
        <SidemenuItem icon={<HomeOutlined />} path={"/monitor/home"} label="Home" />,
        <SidemenuItem icon={<EditOutlined />} path={"/monitor/relatorio"} label="Relatório final" />,
        <SidemenuItem icon={<FileAddOutlined />} path={"/monitor/frequencia"} label="Frequência mensal" />,
        <SidemenuItem icon={<LogoutOutlined />} path={"/"} label="Sair" />
    ];

    useEffect(() => {
        const storedTarefa = sessionStorage.getItem('tarefa');
        if (storedTarefa) {
            setTarefa(JSON.parse(storedTarefa)); // Recuperando a tarefa
        } else {
            const getTarefa = async () => {
                try {
                    const response = await getTarefaService(codigo_tarefa);
                    console.log(response);
                    setTarefa(response.data);
                    const { arquivo_aux, ...tarefaSemArquivoAux } = response.data; // Desestruturando e omitindo arquivo_aux
                    sessionStorage.setItem('tarefa', JSON.stringify(tarefaSemArquivoAux)); // Armazenando a tarefa sem a propriedade arquivo_aux
                } catch (error) {
                    console.error('Erro ao obter detalhes da tarefa:', error.message);
                }
            };

            getTarefa(); // Se não houver dados no sessionStorage, faz a requisição
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

    const handleSubmit = async () => {
        const formData = new FormData();
    
        // Verifica se o monitor adicionou algum arquivo para envio e adiciona-os ao formData
        if (fileList.length > 0) {
            fileList.forEach((file) => {
                // Adiciona cada arquivo ao formData
                formData.append('files', file.originFileObj || file); 
            });
        }
    
        // Envia a resposta do monitor
        try {
            const response = await submitTarefaService(codigo_tarefa, formData);
            console.log(response)
            if (response){
                message.success('Tarefa concluída!');
                setTarefa((prevTarefa) => ({
                    ...prevTarefa,
                    status: 'concluida',
                }));
            }
        } catch (error) {
            console.log(error.message);
            message.error('Erro ao concluir a tarefa.');
        }
    };
    
    const props = {
        onRemove: (file) => {
            const newFileList = fileList.filter((f) => f.uid !== file.uid);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            // Verifica se o número de arquivos no fileList excede o limite máximo
            if (fileList.length >= 3) {
                message.warning('Você só pode enviar até 3 arquivos.');
                return false;
            }
            setFileList([...fileList, file]);  // Atualiza o estado `fileList` com o arquivo selecionado
            return false;  // Previne upload automático
        },
        fileList,
    };    

    const handleBackToLogin = () => {
        navigate('/monitor/home')
    };

    const confirm = () =>
        new Promise((resolve) => {
            handleSubmit()
            setTimeout(() => resolve(null), 3000);
        });

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
                {/* Para impedir que renderize quando a tarefa = null */}
                {tarefa && (
                    <Row justify="center" align="top" className="h-full" gutter={[0, 4]}>
                        <Col xs={20} sm={20} md={16} lg={16} xl={16} justify="center">
                            <section>
                                <h1 className={`${isSmallScreen ? 'text-xl mt-2' : 'text-3xl mt-5'} text-[#365486] font-bold`}>Tarefa: {tarefa.titulo}</h1>
                                <div className="flex flex-col">
                                    <div className="flex-end space-x-2">
                                        <CalendarOutlined className="text-[#365486]" />
                                        <span className={`${isSmallScreen ? 'text-xs' : 'text-sm'} font-normal  text-gray-500`}>Prazo: {moment.utc(tarefa.data_conclusao).format('DD/MM/YYYY')}</span>
                                    </div>
                                </div>
                            </section>
                            <Divider verticalMarginInline={0} />
                        </Col>
                        <Col xs={20} sm={20} md={16} lg={16} xl={16} justify="center" className={`${isSmallScreen ? 'space-y-7' : 'space-y-14'}`}>
                            <section>
                                <p className={`text-gray-500 font-normal ${isSmallScreen ? 'text-sm' : 'text-base'}`}>{tarefa.descricao}</p>
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
                        <Col xs={20} sm={20} md={16} lg={16} xl={16} justify="center">
                            <section>
                                <h1 className={`${isSmallScreen ? 'text-lg mb-3' : 'text-xl mb-5'} text-gray-800 font-bold`}>Envio</h1>
                                <div className={`flex ${isSmallScreen ? 'flex-col mb-5 space-y-2' : 'flex-row mb-5 space-x-2'} `}>
                                    <Popconfirm
                                        title="Marcar como concluída?"
                                        description="Uma vez que a tarefa seja concluída, não será permitido edições."
                                        onConfirm={confirm}
                                        onOpenChange={() => console.log('open change')}
                                    >
                                        <Button
                                            type="primary"
                                            disabled={tarefa.status == 'concluida'}
                                        >
                                            Concluir tarefa
                                        </Button>
                                    </Popconfirm>
                                    <Upload
                                        {...props}
                                        listType="picture"
                                        multiple
                                        maxCount={3}
                                        disabled={tarefa.status === 'concluida'}
                                        className='w-full'
                                    >
                                        <Button icon={<UploadOutlined />}>Anexar arquivo (Max: 3)</Button>
                                    </Upload>
                                </div>
                            </section>
                        </Col>
                    </Row>
                )}
            </section>
        </section>
    );
};

export default TarefaDetalhes;
