import React from "react";
import { Button, Row, Col } from "antd";
import AppHeader from "../../components/layout/AppHeader";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/layout/BackButton";
import Sidemenu from "../../components/layout/Sidemenu";
import SidemenuItem from "../../components/layout/SidemenuItem";
import { HomeOutlined, EditOutlined, FileAddOutlined, OrderedListOutlined, UploadOutlined, BellOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FaCircleUser } from "react-icons/fa6";

const Atribuir = () => {

  const navigate = useNavigate()

  const handleAtribuirTarefa = () => { navigate("/professor/atribuir/tarefa") }
  const handleAtribuirMaterial = () => { navigate("/professor/atribuir/material") }

  const sidemenuItems = [
    <SidemenuItem icon={<HomeOutlined />} path={"/professor"} label="Home" />,
    <SidemenuItem icon={<EditOutlined />} path={"/professor/analises"} label="Análises" />,
    <SidemenuItem icon={<FileAddOutlined />} path={"/professor/atribuir"} label="Atribuições" />,
    <SidemenuItem icon={<OrderedListOutlined />} path={"/professor/selecao"} label="Selecionamento" />,
    <SidemenuItem icon={<UploadOutlined />} path={"/professor/criar-edital"} label="Lançar Edital" />
  ];

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

  return(
    <div className="flex flex-col min-h-screen min-w-full bg-white" >
      <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons}/>
      <BackButton path={"/professor"} />
      <div className="flex justify-center items-center pt-10 lg:pt-44" >
        <Row className="flex justify-center items-center" >
          <Col lg={12} sm={24}>
            <div className="p-5">
              <Button className="p-10 bg-custom-blue text-xl font-semibold text-white hover:text-custom-blue" onClick={handleAtribuirTarefa} >
                  Atribuir tarefa
              </Button>
            </div>
          </Col>
          <Col lg={12} sm={24}>
            <div className="p-5">
              <Button className="p-10 bg-custom-blue text-xl font-semibold text-white hover:text-custom-blue" onClick={handleAtribuirMaterial} >
                  Atribuir material
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  ) 
}
export default Atribuir