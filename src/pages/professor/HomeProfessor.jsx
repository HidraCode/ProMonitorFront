import React from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/layout/AppHeader"
import Sidemenu from "../../components/layout/Sidemenu";
import SidemenuItem from "../../components/layout/SidemenuItem";
import { Button } from "antd";
import { HomeOutlined, EditOutlined, FileAddOutlined, OrderedListOutlined, UploadOutlined, BellOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FaCircleUser } from "react-icons/fa6";

const HomeProfessor = () => {

  const navigate = useNavigate()

  const sidemenuItems = [
    <SidemenuItem icon={<HomeOutlined />} label="Home" />,
    <SidemenuItem icon={<EditOutlined />} label="Análises" />,
    <SidemenuItem icon={<FileAddOutlined />} label="Atribuições" />,
    <SidemenuItem icon={<OrderedListOutlined />} label="Selecionamento" />,
    <SidemenuItem icon={<UploadOutlined />} label="Lançar Edital" />
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

return (
  <div>
  <AppHeader logoColor={null} sideMenu={<Sidemenu items={sidemenuItems} />} buttons={headerButtons}/>
   
  </div>
)
}
export default HomeProfessor