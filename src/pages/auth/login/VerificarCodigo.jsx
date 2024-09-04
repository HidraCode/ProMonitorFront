import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, Input } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import logoPreta from '../../../assets/logoPreta.svg';
import { LeftOutlined } from '@ant-design/icons';
import { verificarCodigoService, recuperarSenhaService } from '../../../services/auth.js';
import { Alert } from 'antd';


const VerificarCodigo = () => {
    const [form] = Form.useForm();
    const [alert, setAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState('');
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const { token, email } = location.state || {};

    const handleSubmit = async (values) => {
        try {
            const response = await verificarCodigoService(values, token);
            // Processa a resposta da API
            const data = await response.json();
            if (response.ok) {
                console.log('Code verification successful:', data);
                form.resetFields(); // Limpa os campos do formulário
            } else {
                console.error('Code verification failed:', data);
                form.resetFields(); // Limpa os campos do formulário
            }
        } catch (error) {
            console.error('Error:', error);
            form.resetFields(); // Limpa os campos do formulário
            if (response.status == 200) {
                /* Se for bem-sucedida, redireciona para a página de recuperação de senha
                com um token informando o id do usuário*/
                navigate('/api/auth/pass-reset', { state: { token } });
            }
        }
        catch (error) {
            // Exibe um alerta de erro
            setTypeAlert('error');
            setAlert(true);
            setMessage('Erro: ' + (error.response?.data?.message || error.message));
            form.resetFields();
        }
    };


    // Configura o alerta
    const alertConfig = (type, mode, message) => {
        setTypeAlert(type);
        setAlert(mode);
        setMessage(message);
    };

    const handleBackToRecuperarSenha = () => {
        navigate('/auth/password-recovery'); // Redireciona para a página de Recuperar Senha
    }

    const handleResend = async () => {
        try {
            // Aciona o serviço de recuperação de senha para reenvio de código
            const response = await recuperarSenhaService({ "email": email }, true)
            // Se a resposta for bem-sucedida, exibe um alerta de sucesso
            if (response.data.success) {
                alertConfig('success', true, "Código reenviado com sucesso.")
            }
        }
        catch (error) {
            alertConfig('error', true, (error.message))
        }
    }


    useEffect(() => {
        // Remove o alerta depois de 5 segundos
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(false);
            }, 5000); //  5 segundos


            return () => clearTimeout(timer);
        }
    }, [alert]);


    return (
        <section className="relative h-screen">
            {/* Botão de voltar */}
            <Button
                onClick={() => navigate('/api/auth/pass-recovery')}
                type="text"
                className="font-medium absolute top-5 left-5"
                icon={<LeftOutlined />}
                onClick={handleBackToRecuperarSenha} // Adiciona o redirecionamento ao clicar
            >
                Voltar
            </Button>
            <Row
                justify="center"
                align="middle"
                className="h-full"
            >
                <Col xs={16} sm={16} md={16} lg={12} xl={6}
                    className="text-center space-y-6"
                >
                    {/* Alerta de sucesso ou erro*/}
                    {alert && <Alert message={message} type={typeAlert} showIcon />}
                    {/* Logo do ProMonitor */}
                    <img src={logoPreta} alt="Logo ProMonitor" className="mx-auto size-5/12" />
                    <h1 className="md:text-3xl text-2xl font-bold">Verificar código</h1>
                    <p className="font-medium sm:text-xs lg:text-sm w-2/3 mx-auto">
                        Digite o código enviado para o seu e-mail: {email}, se não houver nada, solicite o reenvio do código.
                    </p>
                    <Form
                        form={form}
                        className="space-y-5"
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        {/* Campo para inserir o código */}
                        <Form.Item
                            name="verification_code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, digite o código.',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Insira o código"
                                className="appearance-none w-full bg-gray-100 p-2 border-none"
                            />
                        </Form.Item>
                        {/* Botão de enviar o código recebido */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full mb-2 bg-custom-dark-blue text-white p-5 font-semibold border-none hover:bg-custom-dark-blue"
                            >
                                Enviar
                            </Button>
                            <Button type="text" onClick={handleResend}>Reenviar código</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </section>
    );
};


export default VerificarCodigo;