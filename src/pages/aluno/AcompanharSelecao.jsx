import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "antd";
import { HomeOutlined, FileOutlined, TeamOutlined, OrderedListOutlined, BellOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { FaCircleUser } from "react-icons/fa6";
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';

// Estados possíveis para o processo de seleção
const estadosCores = {
  inscrito: "bg-enviado-gray", // Cor para o estado 'inscrito'
  recusado: "bg-recusado-red", // Cor para o estado 'recusado'
  aceito: "bg-aprovado-green", // Cor para o estado 'aceito'
  analise: "bg-em-analise-yellow", // Cor para o estado 'em análise'
};

// Lista global de inscrições (fallback)
const globalInscricoes = [
  {
    codigo_inscricao: 1,
    titulo: "Erro",
    descricao:
      "Não foi possível carregar suas inscrições no momento. Por favor, tente novamente mais tarde.",
    estado: "recusado", // Estado exemplo: inscrito, aceito, recusado, analise
  },
];

const AcompanharSelecao = () => {
  const [inscricoes, setInscricoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInscricoes = async () => {
      try {
        const response = await axios.get("/api/selecao"); // Ajuste a rota conforme necessário
        if (Array.isArray(response.data)) {
          setInscricoes(response.data);
        } else {
          setInscricoes(globalInscricoes); // Usa a lista global se a resposta não for um array
        }
      } catch (error) {
        console.error("Erro ao buscar os dados de inscrição:", error);
        setInscricoes(globalInscricoes); // Usa a lista global de fallback em caso de erro
      }
    };

    fetchInscricoes();
  }, []);

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
            Acompanhar Seleção
          </h1>

          {inscricoes.map((inscricao) => (
            <Card
              key={inscricao.codigo_inscricao}
              className="mb-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 bg-gray-50 px-4 py-2 rounded">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {inscricao.titulo}
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <p className="text-gray-600 my-4 px-4 text-sm sm:text-base text-justify">
                  {inscricao.descricao}
                </p>
                {/* Botão de estado */}
                <div className="flex items-center justify-end">
                  <button
                    className={`text-white text-sm sm:text-base font-semibold px-4 py-2 rounded ${estadosCores[inscricao.estado]}`}
                    disabled
                  >
                    {inscricao.estado === "inscrito" && "Inscrito"}
                    {inscricao.estado === "recusado" && "Recusado"}
                    {inscricao.estado === "aceito" && "Aceito"}
                    {inscricao.estado === "analise" && "Em Análise"}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcompanharSelecao;
