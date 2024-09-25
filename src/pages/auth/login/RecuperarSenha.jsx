import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';
import { Col, Row, Form, Button, Input } from 'antd';
import logoPreta from '../../../assets/logoPreta.svg'
import { LeftOutlined } from '@ant-design/icons';
import { recuperarSenhaService } from '../../../services/auth.js';

const RecuperarSenha = () => {

    const [form] = Form.useForm();
    const [message, setMessage] = useState(null);
    const [alert, setAlert] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            // Recebe a resposta da API
            const response = await recuperarSenhaService(values, false);
            console.log('Received values of form: ', values);

            // Verifica a resposta da API
            if (response.data.success) {
                const token = response.data.token;
                const requestData = { email: values.email, token: token };
                navigate('/auth/recuperar-senha/verificar-codigo', { state: requestData });
            } else {
                setMessage('Erro: ' + response.message);
                setAlert(true);
                console.log(response.message);
            }
        } catch (error) {
            // Exibe um alerta e limpar os campos do formulário
            console.error('Erro ao recuperar a senha:', error.message);
            setMessage('Erro: ' + (error.response?.data?.message || 'Erro desconhecido'));
            setAlert(true);
            form.resetFields(); // Limpa os campos do formulário
        }
    }

    // Remove o alerta depois de 5 segundos
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(false);
            }, 5000); // 5000 ms = 5 segundos
            return () => clearTimeout(timer); // Limpa o temporizador se o componente for desmontado
        }
    }, [alert]);
    return (
        <section className="relative h-screen">
            {/* Botão de voltar */}
            <Button
                onClick={() => navigate('/api/auth/login')}
                type="text"
                className="absolute font-medium lg:text-sm sm:text-xs justify-start m-5 absolute"
                icon={<LeftOutlined />}>
                Voltar
            </Button>
            <Row // Ajustes para que a Row fique centralizada
                justify="center"
                align="middle"
                className="h-full">
                <Col xs={16} sm={16} md={16} lg={12} xl={6} // Ajuste na responsividade
                    justify="center"
                    className="text-center space-y-6" >
                    {/* Mensagem de erro para alertar ao usuário que a requisição falhou */}
                    {alert && <Alert message={message} type={'error'} showIcon />}
                    {/* Logo do ProMonitor */}
                    <img src={logoPreta}
                        alt="Logo ProMonitor"
                        className="mx-auto size-5/12" />
                    <h1 className="mt-0 md:text-3xl text-2xl font-bold">Recuperar senha</h1>
                    <p className="font-medium lg:text-sm sm:text-xs w-2/3 mx-auto">Para redefinir sua senha,
                        informe o e-mail cadastrado na sua conta e lhe enviaremos um link com as instruções.</p>
                    <Form
                        form={form}
                        className="justify-center space-y-5"
                        layout="vertical"
                        onFinish={handleSubmit}
                        requiredMark={false}>
                        {/* Campo para inserir e-mail com obrigatoriedade*/}
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira seu email!',
                                },
                                {
                                    type: 'email',
                                    message: 'O input não é um email válido!',
                                },
                            ]}
                            layout="vertical"
                            label={<span className="font-medium">E-mail:</span>}
                            className="justify-center"
                        >
                            <Input
                                placeholder="Digite seu e-mail"
                                className="w-full bg-gray-100 p-2 border-none" />
                        </Form.Item>
                        {/*Botão para envio do formulário*/}
                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-custom-dark-blue text-white p-5 font-semibold border-none">
                                Enviar</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </section>
    );
};

export default RecuperarSenha;