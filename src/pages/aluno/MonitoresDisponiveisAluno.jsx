import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Input, Button } from "antd"; // Importando Button aqui
import { HomeOutlined, FileOutlined, TeamOutlined, OrderedListOutlined, BellOutlined, ArrowLeftOutlined, UserOutlined } from '@ant-design/icons'
import { FaCircleUser } from "react-icons/fa6";
import AppHeader from '../../components/layout/AppHeader';
import Sidemenu from '../../components/layout/Sidemenu';
import SidemenuItem from '../../components/layout/SidemenuItem';

// Mensagem de erro padrão em caso de falha na conexão com a API
const ErroMonitor = {
  codigo_monitor: 1,
  nome: "Erro ao Carregar Monitores",
  email: "erro.carregar@example.com",
  disciplina: "Erro de Conexão",
};

const MonitoresDisponiveisAluno = () => {
  const [monitores, setMonitores] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const navigate = useNavigate(); // Hook para redirecionamento

  useEffect(() => {
    const fetchMonitores = async () => {
      try {
        const response = await axios.get("/api/monitores");
        // Verifica se a resposta é um array, senão usa o card de erro
        if (Array.isArray(response.data) && response.data.length > 0) {
          setMonitores(response.data);
        } else {
          setMonitores([ErroMonitor]); // Usa o card de erro se a resposta não for um array
        }
      } catch (error) {
        console.error("Erro ao buscar os monitores:", error);
        // Em caso de erro, use o card de erro
        setMonitores([ErroMonitor]);
      }
    };

    fetchMonitores();
  }, []);

  // Função para filtrar os monitores pela disciplina
  const filteredMonitores = monitores.filter((monitor) =>
    monitor.disciplina.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
        <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          Monitores Disponíveis
        </h1>

        {/* Barra de pesquisa */}
        <div className="flex flex-col w-full mb-4">
          <Input
            placeholder="Pesquise o monitor por disciplina"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
            className="w-full px-4 py-2 rounded-lg"
          />
        </div>

        {filteredMonitores.map((monitor) => (
          <Card key={monitor.id} className="mb-4 p-4">
            <div className="flex items-center mb-2 px-4 py-1 bg-gray-50 rounded">
              <UserOutlined className="text-2xl" />
              <h3 className="text-lg font-semibold ml-2">{monitor.nome}</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              Contate o monitor:
              <a
                href={`mailto:${monitor.email}`}
                className="hover:underline text-sm text-blue-500"
              >
                {monitor.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              Disciplina:
              <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                {monitor.disciplina}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MonitoresDisponiveisAluno;
