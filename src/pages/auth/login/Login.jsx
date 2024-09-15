import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select, Row, Col } from 'antd';
import { AiOutlineEye, AiFillEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate
import AppHeader from '../../../components/layout/AppHeader.jsx';
import { loginUserService } from '../../../services/loginUserService.js'; 

const { Option } = Select;
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm();
  const [userType, setUserType] = useState('aluno'); // Adiciona controle para o tipo de usuário
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  // Alterna a visibilidade da senha
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Atualiza o tipo de usuário conforme o dropdown
  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  // Envia os dados de login
  const handleLoginSubmit = async (values) => {
    try {
      const formData = {
        ...values,
        tipo_usuario: userType,
      };
  
      const response = await loginUserService(formData);
  
      form.resetFields();
  
      if (response.role === 'aluno') {
        navigate('/aluno'); // Redireciona para a rota correta do aluno
      } else if (response.role === 'professor') {
        navigate('/professor'); // Redireciona para a rota correta do professor
      } else if (response.role === 'monitor') {
        navigate('/monitor'); // Se houver rota para monitor, configure-a
      } else if (response.role === 'coordenador') {
        navigate('/coordenador'); // Se houver rota para coordenador, configure-a
      } else {
        alert('Tipo de usuário desconhecido.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Houve um problema ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  // Funções de redirecionamento
  const handleSignupRedirect = () => {
    navigate('/signup'); // Exemplo de redirecionamento para cadastro
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Exemplo de redirecionamento para recuperação de senha
  };

  return (
    <>
      <AppHeader />
      <section className="flex flex-col min-h-screen">
        <div className="flex flex-1 flex-col justify-center items-center px-4">
          <div className="w-full max-w-md bg-white p-6 rounded-lg">
            <Row className="mb-6 justify-between items-center">
              <Col>
                <h2 className="text-2xl font-semibold">Login</h2>
              </Col>
              <Col className="w-1/2">
                <Select 
                  defaultValue="aluno" 
                  onChange={handleUserTypeChange} 
                  className="w-full"
                >
                  <Option value="aluno">Aluno</Option>
                  <Option value="professor">Professor</Option>
                  <Option value="monitor">Monitor</Option>
                  <Option value="coordenador">Coordenador</Option>
                </Select>
              </Col>
            </Row>
            
            <div className="border-t border-gray-300 my-6" /> {/* Linha divisória */}
            
            <Form
              name="login"
              form={form}
              className="w-full"
              onFinish={handleLoginSubmit}
            >
              <Form.Item
                name="email"
                className="mb-4"
                rules={[
                  { required: true, message: 'Por favor, insira seu email!' },
                  { type: 'email', message: 'O input não é um email válido!' }
                ]}
              >
                <div className="flex flex-col">
                  <div className="text-sm text-gray-700 mb-1">Email:</div>
                  <Input 
                    prefix={<UserOutlined />} 
                    placeholder="Digite seu email" 
                    className="h-10 pl-4"
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="senha"
                className="mb-4"
                rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
              >
                <div className="flex flex-col">
                  <div className="text-sm text-gray-700 mb-1">Senha:</div>
                  <div className="relative">
                    <Input 
                      prefix={<LockOutlined />} 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Digite sua senha" 
                      className="h-10 pl-4"
                    />
                    <div 
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? <AiFillEye /> : <AiOutlineEye />}
                    </div>
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <div className="flex flex-row justify-between items-center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Lembre-se da minha senha!</Checkbox>
                  </Form.Item>
                  <a 
                    href="#" 
                    className="text-blue-500 hover:underline"
                    onClick={handleForgotPassword} // Adiciona o redirecionamento
                  >
                    Esqueceu a senha?
                  </a>
                </div>
              </Form.Item>

              <Form.Item className="text-center">
                <Button 
                  block 
                  type="primary" 
                  htmlType="submit" 
                  className="mb-4 bg-[#0F1035] hover:bg-[#0A0B2A] h-10"
                >
                  Entrar
                </Button>
                Não possui cadastro? 
                <a 
                  href="#" 
                  className="text-blue-500 hover:underline"
                  onClick={handleSignupRedirect} // Adiciona o redirecionamento
                >
                  Cadastre-se aqui!
                </a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
