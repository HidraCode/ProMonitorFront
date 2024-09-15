import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Modal } from 'antd';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import moment from 'moment';
import { HomeOutlined, FileOutlined, TeamOutlined, OrderedListOutlined, BellOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'
import { FaCircleUser } from "react-icons/fa6";
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';
import { updateStudentService } from '../../services/updateStudentService';

const AlterarDadosAluno = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Inicializa o useNavigate

  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      data_nascimento: values.data_nascimento
        ? moment(values.data_nascimento).format('YYYY-MM-DD')
        : null,
    };

    const filteredValues = filterValues(formattedValues);
    console.log('Form values:', filteredValues);

    try {
      // Chama o serviço para atualizar os dados
      await updateStudentService(filteredValues);

      console.log('Dados atualizados com sucesso!');
      
      // Redireciona o aluno para a home
      navigate('/aluno');
      
    } catch (error) {
      console.error('Erro ao atualizar os dados: ' + error.message);
    }

    
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  const showConfirmationModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const validateCPF = (_, value) => {
    const cpfPattern = /^\d{11}$/;
    if (value && !cpfPattern.test(value)) {
      return Promise.reject(new Error('CPF inválido. Formato esperado: 00000000000'));
    }
    return Promise.resolve();
  };

  const validatePhone = (_, value) => {
    const phonePattern = /^\d{11}$/;
    if (value && !phonePattern.test(value)) {
      return Promise.reject(new Error('Telefone inválido. Formato esperado: 00000000000'));
    }
    return Promise.resolve();
  };

  const validatePasswordConfirmation = (_, value) => {
    if (value && value !== form.getFieldValue('senha')) {
      return Promise.reject(new Error('As senhas não coincidem.'));
    }
    return Promise.resolve();
  };

  const filterValues = (values) => {
    const { confirmarSenha, ...filtered } = values; // Remove 'confirmarSenha' from the object
    return Object.fromEntries(
      Object.entries(filtered).filter(([_, value]) => value !== undefined && value !== null)
    );
  };

  const sidemenuItems = [
    <SidemenuItem icon={<HomeOutlined />} label="Home" />,
    <SidemenuItem icon={<FileOutlined />} label="Novos Editais" />,
    <SidemenuItem icon={<TeamOutlined />} label="Monitores" />,
    <SidemenuItem icon={<OrderedListOutlined />} label="Seleção" />
  ]

  const headerButtons = [
    <>
      <Button
        type="link"
        className="text-white hover:text-gray-300"
        icon={ <BellOutlined style={{ fontSize:'20px' }} /> }
        onClick={null}
      >
      </Button>
      <Button
        type="link"
        className="text-white hover:text-gray-300"
        icon={ <FaCircleUser className='w-6 h-6' /> }
        onClick={null}
      >
      </Button>
    </>
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons} />
      <div className="sticky top-0 left-0 w-full bg-gray-50 py-4">
        <div className="flex items-center justify-start max-w-4xl mx-auto">
          <Button
          type="link"
            onClick={() => navigate("/aluno")}
            className="flex items-center px-4 py-2 rounded-lg text-gray-800"
          >
            <ArrowLeftOutlined />
            <span className="ml-2 text-sm sm:text-base">Voltar</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow bg-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Alterar Dados Pessoais</h2>
        </div>
        <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg">
          <Form
            form={form}
            name="alterar_dados_form"
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
          >
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex flex-col w-full md:w-1/2 px-2 md:px-0">
                <Form.Item
                  name="nome"
                  label="Nome completo"
                >
                  <Input placeholder="Escreva seu nome completo" />
                </Form.Item>
                <Form.Item
                  name="cpf"
                  label="CPF"
                  rules={[{ validator: validateCPF }]}
                >
                  <Input placeholder="000.000.000-00" />
                </Form.Item>
                <Form.Item
                  name="data_nascimento"
                  label="Data de nascimento"
                >
                  <DatePicker placeholder="Selecione sua data de nascimento" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  name="senha"
                  label="Senha"
                  rules={[{ required: true, message: 'Por favor, insira sua senha' }]}
                >
                  <Input.Password placeholder="Escreva sua senha" />
                </Form.Item>
              </div>
              <div className="flex flex-col w-full md:w-1/2 px-2 md:px-0">
                <Form.Item
                  name="matricula"
                  label="Matrícula"
                >
                  <Input placeholder="Escreva sua matrícula" />
                </Form.Item>
                <Form.Item
                  name="telefone"
                  label="Telefone"
                  rules={[{ validator: validatePhone }]}
                >
                  <Input placeholder="(00) 00000-0000" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { type: 'email', message: 'Por favor, insira um e-mail válido' },
                  ]}
                >
                  <Input placeholder="seuemail@exemplo.com" />
                </Form.Item>
                <Form.Item
                  name="confirmarSenha"
                  label="Confirmar senha"
                  rules={[
                    { required: true, message: 'Por favor, confirme sua senha' },
                    { validator: validatePasswordConfirmation },
                  ]}
                >
                  <Input.Password placeholder="Confirme sua senha" />
                </Form.Item>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                type="default"
                icon={<DeleteOutlined />}
                onClick={onReset}
                className="mr-2"
              >
                Limpar
              </Button>
              <Button type="primary" onClick={showConfirmationModal}>
                Atualizar
              </Button>
            </div>
          </Form>
          <Modal
            title="Confirmação"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Confirmar"
            cancelText="Cancelar"
          >
            <p>Você tem certeza que deseja atualizar seus dados?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AlterarDadosAluno;
