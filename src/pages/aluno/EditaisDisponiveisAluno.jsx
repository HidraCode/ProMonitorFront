import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "antd";
import { HomeOutlined, FileOutlined, TeamOutlined, OrderedListOutlined, BellOutlined, ArrowLeftOutlined, LinkOutlined } from '@ant-design/icons'
import { FaCircleUser } from "react-icons/fa6";
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';

// Mensagem de erro padrão em caso de falha na conexão com a API
const ErroEdital = [
  {
    codigo_edital: "Erro",
    titulo: "Erro ao carregar os editais",
    descricao:
      "Não foi possível carregar os editais no momento. Por favor, tente novamente mais tarde.",
    link: "#",
    disciplina: "Erro de conexão",
  },
];

const EditaisDisponiveis = () => {
  const [editais, setEditais] = useState([]);
  const navigate = useNavigate(); // Inicializa o useNavigate

  useEffect(() => {
    const fetchEditais = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/editais");
        if (Array.isArray(response.data)) {
          setEditais(response.data);
        } else {
          setEditais(ErroEdital); // Usa a mensagem de erro se a resposta não for um array
        }
      } catch (error) {
        console.error("Erro ao buscar os editais:", error);
        setEditais(ErroEdital); // Usa a mensagem de erro de fallback em caso de erro
      }
    };

    fetchEditais();
  }, []);

  const sidemenuItems = [
    <SidemenuItem icon={<HomeOutlined />} path={"/aluno"} label="Home" />,
    <SidemenuItem icon={<FileOutlined />} path={"/aluno/editais"} label="Novos Editais" />,
    <SidemenuItem icon={<TeamOutlined />} path={"/aluno/monitores-disponiveis"} label="Monitores" />,
    <SidemenuItem icon={<OrderedListOutlined />} path={"/aluno/acompanhar-selecao"} label="Seleção" />
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons} />
      {/* Botão de Voltar fixado no topo */}
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

      <div className="w-full max-w-4xl mx-auto py-8">
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
            Editais Disponíveis
          </h1>

          {editais.map((edital) => (
            <Card
              key={edital.codigo_edital}
              className="mb-4"
            >
              <div className="ant-card-body p-4 bg-gray-50 rounded">
                <div className="flex flex-col bg-gray-200 px-4 rounded sm:flex-row justify-between items-start sm:items-center mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {edital.titulo}
                  </h3>
                  <a
                    href={edital.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 mt-2 sm:mt-0"
                  >
                    <LinkOutlined className="mr-2" />
                    <span className="text-sm sm:text-base">Acessar Edital</span>
                  </a>
                </div>
                <p className="text-gray-600 my-4 text-sm sm:text-base text-justify">
                  {edital.descricao}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-800 text-xs sm:text-sm font-medium px-2 py-1 rounded">
                    {edital.disciplina}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditaisDisponiveis;
