import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Modal } from 'antd';
import { DeleteOutlined, BellOutlined, HomeOutlined, FileOutlined, EditOutlined, FileAddOutlined, OrderedListOutlined, UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FaCircleUser } from "react-icons/fa6";
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';
import moment from 'moment';
import { createEditalService } from '../../services/createEditalService';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/layout/BackButton';

const { RangePicker } = DatePicker;

const CriarEdital = () => {
  const [form] = Form.useForm(); // Hook para manipular o formulário
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { periodo, ...rest } = values;
    const data_inicio = periodo ? moment(periodo[0]).format('YYYY-MM-DD') : null;
    const data_fim = periodo ? moment(periodo[1]).format('YYYY-MM-DD') : null;

    const formData = {
      ...rest,
      data_inicio,
      data_fim,
    };

    console.log('Form data:', formData);
    
    try {
      // Chama o serviço para criar edital
      await createEditalService(formData);

      console.log('Edital criado com sucesso!');
      
      // Redireciona o professor para a home
      navigate('/professor');
      
    } catch (error) {
      console.error('Erro ao criar edital: ' + error.message);
    }

    onReset(); // Reseta os campos após o envio
  };

  const onReset = () => {
    form.resetFields(); // Limpar todos os campos do formulário
  };

  const showConfirmationModal = () => {
    setIsModalOpen(true); // Exibe o modal de confirmação
  };

  const handleOk = () => {
    form.submit(); // Envia o formulário
    setIsModalOpen(false); // Fecha o modal
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Fecha o modal sem enviar o formulário
  };
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

  const sidemenuItems = [
    <SidemenuItem icon={<HomeOutlined />} path={"/professor"} label="Home" />,
    <SidemenuItem icon={<EditOutlined />} path={"/professor/analises"} label="Análises" />,
    <SidemenuItem icon={<FileAddOutlined />} path={"/professor/atribuir"} label="Atribuições" />,
    <SidemenuItem icon={<FileOutlined />} path={"/professor/atividades"} label={"Atividades"} />,
    <SidemenuItem icon={<OrderedListOutlined />} path={"/professor/selecao"} label="Selecionamento" />,
    <SidemenuItem icon={<UploadOutlined />} path={"/professor/criar-edital"} label="Lançar Edital" />
  ];

  return (
    <>
    <div>
      {/* <AppHeader /> */}
      <AppHeader buttons={headerButtons} sideMenu={<Sidemenu items={sidemenuItems} />} /> 
      <BackButton path={"/professor"} />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 md:my-0 my-16">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Lançar Editais de Monitoria</h2>
        </div>
        <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg">
          <Form
            form={form} // Vincula o form ao hook
            name="edital_form"
            layout="vertical"
            onFinish={onFinish}
            className="w-full"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-4">
                <Form.Item
                  name="titulo"
                  label="Título do Edital"
                  rules={[{ required: true, message: 'Por favor, insira o título do edital' }]}
                >
                  <Input placeholder="Escreva o título do edital" />
                </Form.Item>
                <Form.Item
                  name="disciplina"
                  label="Disciplina"
                  rules={[{ required: true, message: 'Por favor, insira o nome da disciplina' }]}
                >
                  <Input placeholder="Nome da disciplina" />
                </Form.Item>
                <Form.Item
                  name="periodo"
                  label="Período de Inscrição"
                  rules={[{ required: true, message: 'Por favor, selecione o período de inscrição' }]}
                >
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  name="link"
                  label="Link para Documentação do Edital"
                  rules={[{ required: true, message: 'Por favor, insira o link para a documentação' }]}
                >
                  <Input placeholder="Insira o link para a documentação do edital" />
                </Form.Item>
              </div>
              <div className="md:w-1/2 md:pl-4">
                <Form.Item
                  name="descricao"
                  label="Descrição"
                  rules={[{ required: true, message: 'Por favor, insira a descrição do edital' }]}
                  className="h-full w-full"
                >
                  <Input.TextArea rows={10} placeholder="Insira a descrição do edital" />
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
                Resetar
              </Button>
              <Button type="primary" onClick={showConfirmationModal}>
                Enviar
              </Button>
            </div>
          </Form>
          {/* Modal de confirmação */}
          <Modal
            title="Confirmação"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Confirmar"
            cancelText="Cancelar"
          >
            <p>Você tem certeza que deseja enviar o formulário?</p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CriarEdital;
