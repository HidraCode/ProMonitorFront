import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, Input } from 'antd';
import logoPreta from '../../../assets/logoPreta.svg';
import { LeftOutlined } from '@ant-design/icons';
import { redefinirSenhaService } from '../../../services/auth.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from 'antd';

const RedefinirSenha = () => {
    const [form] = Form.useForm();
    const [newPassword, setNewPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState('');
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const token = location.state?.token;

    const validateConfirmPassword = (_, value) => {
        if (value === newPassword) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('As senhas não são iguais!'));
    };

    // Função chamada quando o formulário é enviado com sucesso
    const handleSubmit = async (values) => {
        console.log('Received values of form: ', values);

        try {
            // Recebe a resposta da API
            const response = await redefinirSenhaService(token, values);

            // Processa a resposta da API
            if (response.status == 200) {
                // Se a resposta for bem-sucedida, exibe um alerta de sucesso
                setTypeAlert('success');
                setAlert(true);
                setMessage(response.data.message);
                form.resetFields();
            }

        } catch (error) {
            // Exibe um alerta de erro
            setTypeAlert('error');
            setAlert(true);
            setMessage('Erro: ' + (error.response?.data?.message || error.message));
            form.resetFields();
        }
    };

    // Remove o alerta depois de 2 segundos
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(false);
                // Redireciona após 2 segundos
                if (typeAlert === 'success') {
                    navigate('/api/auth/login');
                }
            }, 2000); // 2 segundos

            return () => clearTimeout(timer); // Limpa o timeout
        }
    }, [alert]);

    return (
        <section className="relative h-screen">
            {/* Botão de voltar */}
            <Button
                onClick={() => navigate('/api/auth/login')}
                type="text"
                className="font-medium absolute top-5 left-5"
                icon={<LeftOutlined />}>
                Voltar
            </Button>
            <Row // Ajustes para que a Row fique centralizada
                justify="center"
                align="middle"
                className="h-full">
                <Col xs={16} sm={16} md={12} lg={12} xl={6} // Ajuste na responsividade
                    className="text-center space-y-6"
                >
                    {/* Alerta de sucesso ou erro*/}
                    {alert && <Alert message={message} type={typeAlert} showIcon />}
                    {/* Logo do ProMonitor */}
                    <img src={logoPreta} alt="Logo ProMonitor" className="mx-auto size-5/12" />
                    <h1 className="mt-0 md:text-3xl text-2xl font-bold mx-auto">Redefinir senha</h1>
                    <Form
                        form={form}
                        className="space-y-5"
                        layout="vertical"
                        onFinish={handleSubmit}>
                        {/* Campo para inserir o código. Inicialmente suporta letras e números*/}
                        <Row gutter={16}>
                            {/* Senha */}
                            <Col xs={20} sm={12} md={12} lg={12} xl={12} className="mx-auto">
                                <Form.Item
                                    label="Nova senha"
                                    name="senha"
                                    rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                                >
                                    <Input.Password onChange={e => setNewPassword(e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col xs={20} sm={12} md={12} lg={12} xl={12} className="mx-auto">
                                {/* Confirmar senha */}
                                <Form.Item
                                    label="Confirmar senha"
                                    name="confirmar_senha"
                                    rules={[{ required: true, message: 'Por favor, confirme sua senha!' }, { validator: validateConfirmPassword }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button type="primary" className="w-full mt-4 bg-custom-dark-blue" htmlType="submit">Redefinir</Button>
                    </Form>
                </Col>
            </Row>
        </section>
    );
};

export default RedefinirSenha;
