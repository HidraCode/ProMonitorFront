import React, { useState, useEffect } from 'react';
import { Row, Col, message, Input, Button, Divider, Radio } from 'antd';
import { useMediaQuery } from 'react-responsive';
import brasao from '../../assets/brasao.png';
import { getMonitoria } from '../../services/monitorService';
import { baixarFrequencia, getFrequencia } from '../../services/documentoService';

import moment from 'moment';

export const FrequenciaForm = ({ onSubmit, role, documentId }) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const [assinado, setAssinado] = useState(false);
    const handleFormChange = (field, value) => { setFormData(prev => ({ ...prev, [field]: value })); };// Função para alterar os valores dos inputs
    const [horasPorDia, setHorasPorDia] = useState(Array.from({ length: 30 }, (_, i) => ({ dia: i + 1, horas: '' }))); // Estado para armazenar o valor de horas por dia
    const handleHorasChange = (dia, value) => { setHorasPorDia(horasPorDia.map(d => d.dia === dia ? { ...d, horas: value } : d)); }; // Manipula a alteração de horas por dia
    // valores dos inputs
    const [formData, setFormData] = useState({
        dataInicio: '',
        nome: '',
        departamento: '',
        orientador: '',
        totalHoras: '',
        observacao: '',
        dataAssinatura: '',
        parecer: '',
    });

    // Função para manipular o envio dos dados
    const handleSubmit = async () => {

        // Juntando os dados a submeter
        const dataToSubmit = { ...formData, horasPorDia };

        await onSubmit(dataToSubmit);

        if (role === 'monitor') {
            cleanFields();
        } else {
            setAssinado(true);
            message.success('Frequência assinada com sucesso');
        }
    };

    // Limpa os campos após o envio
    const cleanFields = () => {
        setHorasPorDia(Array.from({ length: 30 }, (_, i) => ({ dia: i + 1, horas: '' })));
        handleFormChange('departamento', '');
        setAssinado(false);
        message.success('Frequência enviada para análise do professor.');
    };

    // Inicializa os dados dependendo do role
    useEffect(() => {
        const initializeData = async () => {
            try {
                if (role === 'monitor') {
                    // Tenta pegar os dados do sessionStorage
                    const storedMonitoriaData = sessionStorage.getItem('monitoriaData');

                    if (storedMonitoriaData) {
                        // Se os dados já estão no sessionStorage, usa eles
                        const monitoriaData = JSON.parse(storedMonitoriaData);
                        handleFormChange('nome', monitoriaData.nome_monitor);
                        handleFormChange('orientador', monitoriaData.orientador);
                        handleFormChange('dataInicio', monitoriaData.dataInicio);
                    } else {
                        // Se não há dados no sessionStorage, faz a chamada à API
                        const response = await getMonitoria();
                        if (response.status === 500) {
                            throw new Error(response.message);
                        }
                        // Atualiza o formulário
                        handleFormChange('nome', response.data.nome_monitor);
                        handleFormChange('orientador', response.data.orientador);
                        handleFormChange('dataInicio', response.data.dataInicio);

                        // Salva os dados no sessionStorage
                        sessionStorage.setItem('monitoriaData', JSON.stringify(response.data));
                    }
                } else if (role === 'professor') {
                    // Tenta pegar os dados do sessionStorage
                    const storedFrequenciaData = sessionStorage.getItem(`frequenciaData_${documentId}`);

                    if (storedFrequenciaData) {
                        // Se os dados já estão no sessionStorage, usa eles
                        const frequenciaData = JSON.parse(storedFrequenciaData);
                        setFormData(frequenciaData);
                        setHorasPorDia(frequenciaData.horasPorDia);
                    } else {
                        // Se não há dados no sessionStorage, faz a chamada à API
                        const response = await getFrequencia(documentId);
                        if (response.status === 500) {
                            throw new Error(response.message);
                        }

                        const data = response.data.dadosFormulario;
                        const frequenciaData = {
                            nome: data.nome,
                            orientador: data.orientador,
                            dataInicio: data.dataInicio,
                            departamento: data.departamento,
                            totalHoras: data.totalHoras,
                            observacao: data.observacao,
                            parecer: data.parecer,
                            dataAssinatura: data.dataAssinatura ? data.dataAssinatura : moment(new Date()).format('DD/MM/YYYY'),
                            horasPorDia: data.horasPorDia
                        };

                        // Atualiza o formulário
                        setFormData(frequenciaData);
                        setHorasPorDia(frequenciaData.horasPorDia);

                        // Salva os dados no sessionStorage
                        sessionStorage.setItem(`frequenciaData_${documentId}`, JSON.stringify(frequenciaData));
                    }
                }
            } catch (error) {
                console.error('Erro ao obter os dados:', error.message);
            }
        };

        initializeData();
    }, [role, documentId]);


    // Atualiza o total de horas sempre que há mudança nos valores de horas
    useEffect(() => {
        const total = horasPorDia.reduce((acc, curr) => acc + (parseFloat(curr.horas) || 0), 0);
        handleFormChange('totalHoras', total);
    }, [horasPorDia]);

    // Re-renderiza quando o documento se torna assinado
    useEffect(() => {
        if (assinado) {
            setFormData(prev => ({ ...prev }));
        }
    }, [assinado]);

    // Função de validação dos campos
    const validateData = () => {
        if (role === 'monitor') {
            const hasEmptyFields = horasPorDia.some((item) => item.horas === '' || item.horas < 0);
            if (!formData.departamento || !formData.totalHoras || formData.totalHoras > 54 || hasEmptyFields) {
                message.warning('Campos vazios ou inválidos.');
                return;
            }
        } else {
            if (!formData.parecer || !formData.observacao) {
                message.warning('Preencha todos os campos obrigatórios.');
                return;
            }
        }

        handleSubmit();
    };

    const handleDownload = async () => {
        try {
            const response = await baixarFrequencia(documentId);
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = `frequencia_assinada_${documentId}.pdf`;

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
                <Col span={6} className="flex justify-center w-full mb-4">
                    <img src={brasao} alt="Brasão" className="w-1/2 h-1/2" />
                </Col>
                <Col span={18} className='font-bold mb-4 md:text-lg xs:text-xs'>
                    <p>UNIVERSIDADE FEDERAL RURAL DE PERNAMBUCO</p>
                    <p>PRÓ-REITORIA DE ENSINO DE GRADUAÇÃO</p>
                    <p>COORDENAÇÃO GERAL DE CURSOS DE GRADUAÇÃO</p>
                    <p>PROGRAMA DE MONITORIA</p>
                </Col>
            </Row>
            <Row className="border border-black text-center mb-4  mx-2">
                <Col span={12} className="border-r border-black font-bold h-[40px]">
                    <p>FREQUÊNCIA MENSAL</p>
                    <p>(FORMULÁRIO No 06)</p>
                </Col>
                <Col span={12} className='font-bold'>
                    <p>MÊS INICIAL/ANO</p>
                    <p>{formData.dataInicio}</p>
                </Col>
            </Row>

            {/* Seção 1: Identificação do Monitor */}
            <Row className="border-none bg-[#dddddd] mb-4 mx-2">
                <Col span={24}>
                    <h1 className='px-2 font-bold'>1. IDENTIFICAÇÃO DO MONITOR</h1>
                </Col>
            </Row>
            <Row className="mb-4 mx-2">
                <Col span={24}>
                    <Row className="mb-2">
                        <Col span={24}>NOME: {formData.nome}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col xs={12} md={4}>DEPARTAMENTO/ÁREA: </Col>
                        <Col xs={12} md={20}>
                            <Input
                                readOnly={role === 'professor' || assinado}
                                value={formData.departamento}
                                onChange={(e) => handleFormChange('departamento', e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col span={24}>ORIENTADOR: {formData.orientador}</Col>
                    </Row>
                </Col>
            </Row>

            {/* Seção 2: Frequência */}
            <Row className="border-none bg-[#dddddd] mb-4 mx-2">
                <Col span={24}>
                    <h1 className='px-2 font-bold'>2. FREQUÊNCIA</h1>
                </Col>
            </Row>
            <ul className='list-disc ml-5 mb-4'>
                <li>Registro da frequência mensal deve ser do dia 01 ao dia 30 de cada mês</li>
                <li>A frequência semanal do Monitor é de 12 horas, sendo combinada entre Orientador e Monitor. Esta usualmente totalizará 48 a 54 horas mensais, conforme o número de dias de atividade no período.</li>
                <li>Não havendo registro de faltas anotadas pelo Orientador, será considerada frequência integral aquela com valores totais iguais ou maiores que 48 horas.</li>
                <li>O Departamento deverá entregar a frequência na PREG até o dia 21 de cada mês.</li>
            </ul>
            <Row className="border border-black text-center mb-4 mx-2">
                <Col span={24}>
                    <table className="w-full">
                        <thead className="bg-[#dddddd] font-bold border">
                            <tr>
                                <th>Dia do Mês</th>
                                <th>TOTAL DE HORAS</th>
                                <th>Dia do Mês</th>
                                <th>TOTAL DE HORAS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(15).keys()].map(index => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Input
                                            className='w-1/2'
                                            type="number"
                                            min={0}
                                            required
                                            readOnly={role === 'professor' || assinado}
                                            value={horasPorDia[index].horas}
                                            onChange={(e) => handleHorasChange(index + 1, e.target.value)}
                                        />
                                    </td>
                                    <td>{index + 16}</td>
                                    <td>
                                        <Input
                                            className='w-1/2'
                                            type="number"
                                            min={0}
                                            required
                                            readOnly={role === 'professor' || assinado}
                                            value={horasPorDia[index + 15].horas}
                                            onChange={(e) => handleHorasChange(index + 16, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className='w-full border-t border-black'>
                            <tr>
                                <td colSpan={3} className="py-2 text-right border-r border-black "><b>TOTAL:</b></td>
                                <td><b>{formData.totalHoras} horas</b></td>
                            </tr>
                        </tfoot>
                    </table>
                </Col>
            </Row>

            {/* Seção 3: Parecer do Orientador */}
            <Row className="border-none bg-[#dddddd] mx-2">
                <Col span={24}>
                    <h1 className='px-2 font-bold'>3. PARECER DO ORIENTADOR:</h1>
                </Col>
            </Row>
            <Row className="border border-black mb-4 mx-2">
                <Col span={24}>
                    <Row className="mb-2">
                        <Col span={8} className='m-1'>
                            DESEMPENHO DO MONITOR:
                        </Col>
                        <Col span={8} className='m-1'>
                            <Radio.Group disabled={role === 'monitor' || assinado} onChange={(e) => handleFormChange('parecer', e.target.value)} value={formData.parecer} className='justify-between'>
                                <Radio value={'satisfatorio'}>SATISFATÓRIO</Radio>
                                <Radio value={'insatisfatorio'}>INSATISFATÓRIO</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Col span={24}>
                        <Divider style={{ borderColor: '#000000', width: '100%' }} className="w-full m-0 p-0" />
                    </Col>
                    <Row className="mb-5">
                        <Col span={24}>
                            Observações:
                            <Input.TextArea
                                readOnly={role === 'monitor' || assinado}
                                value={formData.observacao}
                                onChange={(e) => handleFormChange('observacao', e.target.value)}
                                maxLength={300}
                                showCount
                                style={{ height: 50, resize: 'none' }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Seção 4: Assinatura do Orientador */}
            <Row className="border-none bg-[#dddddd] mx-2">
                <Col span={24}>
                    <h1 className='px-2 font-bold'>4. ASSINATURA DO ORIENTADOR</h1>
                </Col>
            </Row>
            <Row className="border border-black mb-4 mx-2 text-center">
                <Col span={24}>
                    <Row className="my-2">
                        <Col xs={2} md={2}>
                            RECIFE,
                        </Col>
                        <Col xs={10} md={2}>
                            {formData.dataAssinatura}
                        </Col>
                        {!assinado && (<Col xs={12} md={16}>
                            <p>{isSmallScreen ? '________________________' : '________________________________________________________________________'}</p>
                            <p>Assinatura do Orientador</p>
                        </Col>)}
                        {assinado && (<Col xs={12} md={16}>
                            <p className='italic'>Documento assinado eletronicamente por {formData.orientador}</p>
                            <p>Professor Orientador</p>
                        </Col>)}
                    </Row>
                    <Row className="mb-2">
                    </Row>
                </Col>
            </Row>

            {/* Botão de Envio */}
            <Row className="text-right mx-2">
                <Col span={24}>
                    {role == 'professor' &&
                        (<Button disabled={assinado === false} download={`frequencia.pdf`} type='link' onClick={handleDownload}>Baixar PDF</Button>)}
                    <Button type="primary" disabled={assinado} onClick={validateData}>Assinar e enviar</Button>
                </Col>
            </Row>
        </div>
    );
};
