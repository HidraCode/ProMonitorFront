import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// import AppHeader from '../../components/layout/Header';
import moment from 'moment';

const { RangePicker } = DatePicker;

const EditalForm = () => {
  const [form] = Form.useForm(); // Hook para manipular o formulário
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal

  const onFinish = (values) => {
    const { periodo, ...rest } = values;
    const data_inicio = periodo ? moment(periodo[0]).format('YYYY-MM-DD') : null;
    const data_fim = periodo ? moment(periodo[1]).format('YYYY-MM-DD') : null;

    const formData = {
      ...rest,
      data_inicio,
      data_fim,
    };

    console.log('Form data:', formData);
    // Aqui você pode fazer a requisição para a API com o formData

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

  return (
    <div>
      {/* <AppHeader /> */}
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
    </div>
  );
};

export default EditalForm;
