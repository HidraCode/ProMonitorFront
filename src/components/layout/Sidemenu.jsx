import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { HomeFilled, MenuOutlined } from '@ant-design/icons';

const Sidemenu = ({ items  }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button type={'text'} onClick={toggleMenu} className="p-2 rounded" icon={<MenuOutlined className='text-white w-10 h-10 ' />}>
      </Button>
      <div className={`fixed inset-0 bg-white bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>
      
      <div className={`fixed top-0 z-10 left-0 h-full w-64 bg-white shadow-md transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Menu className='pt-5' >
        {items && items.map((item, index) => (
          <div key={index} className='pt-4' >
            {item}
          </div>
        ))}
        </Menu>
      </div>
    </div>
  );
};

export default Sidemenu;