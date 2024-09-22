import React, { useState, useEffect } from 'react';
import { Row, Col, message, Input, Button, Divider, Radio } from 'antd';
import brasao from '../../assets/brasao.png';
import { getMonitoria } from '../../services/monitorService';
import { baixarRelatorio, getRelatorio } from '../../services/documentoService';
import { useMediaQuery } from 'react-responsive';


import moment from 'moment';

export const RelatorioForm = ({ onSubmit, role, documentId }) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const [assinado, setAssinado] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        disciplina: '',
        orientador: '',
        curso: '',
        metodologia: '',
        atividades: '',
        objetivos: '',
        dificuldades: '',
        conclusao: '',
        dataAssinatura: ''
    });

    // Função para alterar os valores dos inputs
    const handleFormChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Função para manipular o envio dos dados
    const handleSubmit = async () => {
        const dataToSubmit = { ...formData };

        await onSubmit(dataToSubmit);

        if (role === 'monitor') {
            cleanFields();
        } else {
            setAssinado(true);
            message.success('Relatório assinado com sucesso');
        }
    };

    // Limpa os campos após o envio
    const cleanFields = () => {
        setFormData({
            metodologia: '',
            atividades: '',
            objetivos: '',
            dificuldades: '',
            conclusao: '',
            data_criacao: ''
        });

        setAssinado(false);
        message.success('Relatório enviado para análise do professor.');
    };

    useEffect(() => {
        const initializeData = async () => {
            try {
                if (role === 'monitor') {
                    // Verifica se os dados estão no sessionStorage
                    const storedMonitoriaData = sessionStorage.getItem('monitoriaData');
                    
                    if (storedMonitoriaData) {
                        const monitoriaData = JSON.parse(storedMonitoriaData);
                        setFormData({
                            nome: monitoriaData.nome_monitor,
                            disciplina: monitoriaData.disciplina,
                            orientador: monitoriaData.orientador,
                        });
                    } else {
                        const response = await getMonitoria();
                        if (response.status === 500) {
                            throw new Error(response.message);
                        }

                        setFormData({
                            nome: response.data.nome_monitor,
                            orientador: response.data.orientador,
                            disciplina: response.data.disciplina,
                        });

                        // Salva os dados no sessionStorage
                        sessionStorage.setItem('monitoriaData', JSON.stringify(response.data));

                    }
                } else if (role === 'professor') {
                    const storedRelatorioData = sessionStorage.getItem(`relatorioData_${documentId}`);
                    
                    if (storedRelatorioData) {
                        const frequenciaData = JSON.parse(storedRelatorioData);
                        setFormData(frequenciaData);
                        setAssinado(frequenciaData.dataAssinatura ? true : false);
                    } else {
                        const response = await getRelatorio(documentId);
                        if (response.status === 500) {
                            throw new Error(response.message);
                        }

                        const data = response.data.dadosFormulario;
                        const relatorioData = {
                            nome: data.nome,
                            disciplina: data.disciplina,
                            orientador: data.orientador,
                            curso: data.curso,
                            metodologia: data.metodologia,
                            atividades: data.atividades,
                            objetivos: data.objetivos,
                            dificuldades: data.dificuldades,
                            conclusao: data.conclusao,
                            dataAssinatura: data.dataAssinatura || moment(new Date()).format('DD/MM/YYYY')
                        };

                        setFormData(relatorioData);

                        // Salva os dados no sessionStorage
                        sessionStorage.setItem(`relatorioData_${documentId}`, JSON.stringify(relatorioData));

                        setAssinado(data.dataAssinatura ? true : false);
                    }
                }
            } catch (error) {
                console.error('Erro ao obter os dados:', error.message);
            }
        };
        initializeData();
    }, [role, documentId]);
    
    // // Atualiza o total de horas sempre que há mudança nos valores de horas
    // useEffect(() => {
    //     const total = horasPorDia.reduce((acc, curr) => acc + (parseFloat(curr.horas) || 0), 0);
    //     handleFormChange('totalHoras', total);
    // }, [horasPorDia]);

    // Re-renderiza quando o documento se torna assinado
    useEffect(() => {
        if (assinado) {
            setFormData(prev => ({ ...prev }));
        }
    }, [assinado]);

    // Função de validação dos campos
    const validateData = () => {
        console.log(formData)
        console.log(role)
        if (role == 'monitor') {

            if (!formData.metodologia || !formData.objetivos || !formData.curso ||
                !formData.atividades || !formData.conclusao || !formData.dificuldades) {
                message.warning('Campos vazios ou inválidos.');
                return;
            }
        } else {
            const hasEmptyFields = Object.values(formData).some(value => value === '');

            if (hasEmptyFields) {
                message.error('Campos vazios ou inválidos.');
                return;
            }
        }

        handleSubmit();
    };

    const handleDownload = async () => {
        try {
            const response = await baixarRelatorio(documentId);
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = `relatorio_assinado_${documentId}.pdf`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            message.error('Erro ao baixar arquivo: ', error);
        }
    };

    return (
        <div>
            {/* Cabeçalho */}
            <Row justify="center" align="middle" className="text-center my-10 mx-2">
                <Col xs={6} md={6} className="flex justify-center w-full mb-4">
                    <img src={brasao} alt="Brasão" className={`${isSmallScreen ? 'w-full h-full' : 'w-1/2 h-1/2'}`}/>
                </Col>
                <Col xs={18} md={18} className='font-bold mb-4 md:text-lg xs:text-xs'>
                    <p>UNIVERSIDADE FEDERAL RURAL DE PERNAMBUCO</p>
                    <p>PRÓ-REITORIA DE ENSINO DE GRADUAÇÃO</p>
                    <p>COORDENAÇÃO GERAL DE CURSOS DE GRADUAÇÃO</p>
                    <p>PROGRAMA DE MONITORIA</p>
                </Col>
            </Row>
            <Row className={`font-semibold mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    <Row className="mb-2">
                        <Col span={24}>NOME: {formData.nome}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={12} md={2}>CURSO: </Col>
                        <Col xs={12} md={12}>
                            <Input
                                readOnly={role === 'professor' || assinado}
                                value={formData.curso}
                                onChange={(e) => handleFormChange('curso', e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col span={24}>ORIENTADOR: {formData.orientador}</Col>
                    </Row>
                </Col>
            </Row>
            {/* METODOLOGIAS UTILIZADAS */}
            <Row className={`border-none mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    <h1 className='font-bold'>1. METODOLOGIAS UTILIZADAS</h1>
                </Col>
            </Row>
            <Row className={`border-none mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    <Input.TextArea
                        readOnly={role === 'professor' || assinado}
                        value={formData.metodologia}
                        onChange={(e) => handleFormChange('metodologia', e.target.value)}
                        showCount
                        autoSize={{ minRows: isSmallScreen ? 2 : 3, maxRows: isSmallScreen ? 7 : 15 }}
                        style={{ resize: 'auto' }}
                    />
                </Col>
            </Row>

            {/* ATIVIDADES PLANEJADAS */}
            <Row className={`border-none mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    <h1 className='font-bold'>2. ATIVIDADES PLANEJADAS REALIZADAS DURANTE O PERÍODO</h1>
                </Col>
            </Row>
            <Row className={`border-none mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    <Input.TextArea
                        value={formData.atividades}
                        onChange={(e) => handleFormChange('atividades', e.target.value)}
                        showCount
                        autoSize={{ minRows: isSmallScreen ? 2 : 3, maxRows: isSmallScreen ? 7 : 15 }}
                        style={{ resize: 'auto' }}
                        readOnly={role === 'professor' || assinado}
                    />
                </Col>
            </Row>
            {/* OBJETIVOS ATINGIDOS */}
            <Row className={`border-none mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    <h1 className='font-bold'>3. OBJETIVOS ATINGIDOS (SE NÃO, COM JUSTIFICATIVAS)</h1>
                </Col>
            </Row>
            <Row className={`border-none mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    <Input.TextArea
                        readOnly={role === 'professor' || assinado}
                        value={formData.objetivos}
                        onChange={(e) => handleFormChange('objetivos', e.target.value)}
                        showCount
                        autoSize={{ minRows: isSmallScreen ? 2 : 3, maxRows: isSmallScreen ? 7 : 15 }}
                        style={{ resize: 'auto' }} />
                </Col>
            </Row>
            {/* DIFICULDADES */}
            <Row className={`border-none mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    <h1 className='font-bold'>4. DIFICULDADES ENFRENTADAS E SUGESTÕES PARA SOLUCIONÁ-LAS</h1>
                </Col>
            </Row>
            <Row className={`border-none mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    <Input.TextArea
                        readOnly={role === 'professor' || assinado}
                        value={formData.dificuldades}
                        onChange={(e) => handleFormChange('dificuldades', e.target.value)}
                        showCount
                        autoSize={{ minRows: isSmallScreen ? 2 : 3, maxRows: isSmallScreen ? 7 : 15 }}
                        style={{ resize: 'auto' }} />
                </Col>
            </Row>
            {/* CONCLUSÃO */}
            <Row className={`border-none mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    <h1 className='font-bold'>5. CONCLUSÕES</h1>
                </Col>
            </Row>
            <Row className={`border-none mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    <Input.TextArea
                        readOnly={role === 'professor' || assinado}
                        value={formData.conclusao}
                        onChange={(e) => handleFormChange('conclusao', e.target.value)}
                        showCount
                        autoSize={{ minRows: isSmallScreen ? 2 : 3, maxRows: isSmallScreen ? 7 : 15 }}
                        style={{ resize: 'auto' }} />
                </Col>
            </Row>
            {/* Botão de Envio */}
            <Row className={`text-right mb-4 ${isSmallScreen ? 'mx-5' : 'mx-2'}`}>
                <Col span={24}>
                    {role == 'professor' &&
                        (<Button disabled={assinado === false} download={`relatorio.pdf`} type='link' onClick={handleDownload}>Baixar PDF</Button>)}
                    <Button type="primary" onClick={handleSubmit}>Assinar e enviar</Button>{/*disabled={assinado}*/}
                </Col>
            </Row>
        </div>
    );
};
