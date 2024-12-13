import React, { useState } from "react";
import AppHeader from "../../components/layout/AppHeader";
import Sidemenu from "../../components/layout/Sidemenu";
import SidemenuItem from "../../components/layout/SidemenuItem";
import { Form, Button, DatePicker, Select, Upload, message, Input } from 'antd';
import { HomeOutlined, UploadOutlined, FileAddOutlined, OrderedListOutlined, BellOutlined, EditOutlined, FileOutlined } from '@ant-design/icons';
import { FaCircleUser } from "react-icons/fa6";
import BackButton from "../../components/layout/BackButton";
import TextArea from "antd/es/input/TextArea";
import axios from 'axios';  // Import axios para requisições
import { useEffect } from "react";

const AtribuirTarefa = () => {
  const [form] = Form.useForm(); // Hook para manipular o formulário
  const [fileList, setFileList] = useState([]); // Estado para armazenar arquivos
  const [monitores, setMonitores] = useState([]);

  // Manipulador de arquivos para upload
  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const onFinish = async (values) => {
    const { disciplina, monitor, prazo, descricao, titulo, tipo } = values;
    
    // Cria um objeto FormData para enviar os arquivos e outros campos
    const formData = new FormData();
    formData.append('codigo_professor', localStorage.getItem('codigo_usuario'));
    formData.append('disciplina', disciplina);
    formData.append('codigo_monitor', monitor);
    formData.append('data_conclusao', prazo ? prazo.format('YYYY-MM-DD') : '');
    formData.append('descricao', descricao);
    formData.append('titulo', titulo);
    formData.append('tipo', tipo);

    // Adiciona os arquivos ao FormData
    fileList.forEach(file => {
      formData.append('arquivo_aux', file.originFileObj);
    });

    try {
      // Faz a requisição para enviar os dados e os arquivos
      const response = await axios.post('http://localhost:3000/api/professores/atribuir-tarefa', formData, {
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

  const selectTypeOptions = [
    { value: 'tarefa', label: <span>Tarefa</span> },
    { value: 'material', label: <span>Material de Apoio</span> }
  ]

  // obter os monitores do professor ao montar o componente
  useEffect(() => {
    const fetchMonitores = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/monitores/professor/${localStorage.getItem('codigo_usuario')}`);
        setMonitores(response.data);
      } catch (error) {
        message.error('Erro ao carregar os monitores');
      }
    };

    fetchMonitores();
  }, []);

  return(
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons} />
        <BackButton path={"/professor"} />

        <div className="flex flex-col items-center justify-center flex-grow bg-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-custom-blue">Atribuir Atividade</h2>
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
                    name="tipo"
                    label="Tipo de atividade"
                  >
                    <Select options={selectTypeOptions} placeholder="Selecione a atividade"></Select>
                  </Form.Item>
                  <Form.Item    
                    name="titulo"
                    label="Título"
                  >
                    <Input placeholder="Insira o título"></Input>
                  </Form.Item>
                  <Form.Item
                    name="disciplina"
                    label="Disciplina"
                  >
                    <Input placeholder="Insira a disciplina" ></Input>
                  </Form.Item>
                  <Form.Item
                    name="monitor"
                    label="Monitor"
                  >
                    <Select placeholder="Selecione um monitor" >
                    {monitores.map((monitor) => (
                      <Option key={monitor.codigo_monitor} value={monitor.codigo_monitor}>
                        {monitor.nome}
                      </Option>
                    ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="flex flex-col w-full md:w-1/2 px-2 md:px-0">
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
