import React, { useState } from "react";
import AppHeader from "../../components/layout/AppHeader";
import Sidemenu from "../../components/layout/Sidemenu";
import SidemenuItem from "../../components/layout/SidemenuItem";
import { Form, Input, Button, DatePicker, Modal, Select, Upload, message } from 'antd';
import { HomeOutlined, UploadOutlined, FileOutlined, TeamOutlined, OrderedListOutlined, BellOutlined } from '@ant-design/icons';
import { FaCircleUser } from "react-icons/fa6";
import BackButton from "../../components/layout/BackButton";
import TextArea from "antd/es/input/TextArea";
import axios from 'axios';  // Import axios para requisições

const AtribuirTarefa = () => {
  const [form] = Form.useForm(); // Hook para manipular o formulário
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]); // Estado para armazenar arquivos

  // Manipulador de arquivos para upload
  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const onFinish = async (values) => {
    const { disciplina, monitor, prazo, descricao } = values;
    
    // Cria um objeto FormData para enviar os arquivos e outros campos
    const formData = new FormData();
    formData.append('disciplina', disciplina);
    formData.append('monitor', monitor);
    formData.append('prazo', prazo ? prazo.format('YYYY-MM-DD') : '');
    formData.append('descricao', descricao);

    // Adiciona os arquivos ao FormData
    fileList.forEach(file => {
      formData.append('arquivosAuxiliares', file.originFileObj);
    });

    try {
      // Faz a requisição para enviar os dados e os arquivos
      const response = await axios.post('/api/atribuir-tarefa', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Tarefa atribuída com sucesso!');
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      message.error('Falha ao atribuir tarefa. Tente novamente.');
    }
  };

  const handleSubmit = () => {
    form.submit(); // Envia o formulário
    setIsModalOpen(false); // Fecha o modal
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
  ];

  const sidemenuItems = [
    <SidemenuItem icon={<HomeOutlined />} label="Home" />,
    <SidemenuItem icon={<FileOutlined />} label="Novos Editais" />,
    <SidemenuItem icon={<TeamOutlined />} label="Monitores" />,
    <SidemenuItem icon={<OrderedListOutlined />} label="Seleção" />
  ];

  return(
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons} />
        <BackButton path={"/professor"} />

        <div className="flex flex-col items-center justify-center flex-grow bg-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-custom-blue">Atribuir Tarefa</h2>
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
                    name="disciplina"
                    label="Disciplina"
                  >
                    <Select placeholder="Selecione a disciplina" />
                  </Form.Item>
                  <Form.Item
                    name="monitor"
                    label="Monitor"
                  >
                    <Select placeholder="Selecione um monitor" />
                  </Form.Item>
                  <Form.Item
                    name="arquivosAuxiliares"
                    label="Arquivos auxiliares"
                  >
                    <Upload
                      fileList={fileList}
                      beforeUpload={() => false} // Desativa o envio automático
                      onChange={handleFileChange}
                      multiple
                    >
                      <Button icon={<UploadOutlined />}>
                        Upload
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>
                <div className="flex flex-col w-full md:w-1/2 px-2 md:px-0">
                  <Form.Item
                    name="prazo"
                    label="Prazo"
                  >
                    <DatePicker placeholder="Selecione a data" />
                  </Form.Item>
                  <Form.Item
                    name="descricao"
                    label="Descrição"
                  >
                    <TextArea rows={4} placeholder="Insira uma descrição" />
                  </Form.Item>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button type="primary" onClick={handleSubmit} className="bg-custom-blue hover:bg-custom-light-blue">
                  Enviar
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AtribuirTarefa;
