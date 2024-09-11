import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import logo from "../../../public/logo.svg";
import { Image, Button, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons'

const { Header } = Layout;

const AppHeader = ({ logoColor, sideMenu, buttons }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handlers for button clicks
  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  const handleSignupClick = () => {
    navigate('/auth/signup');
  };

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <Header className="h-16 w-full bg-custom-dark-blue flex justify-between items-center px-4 sm:px-6">
      {sideMenu && <div>{sideMenu}</div>}
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        {/* Prop para escolher entre os diferentes tipos de logo */}
        {logoColor || (
          <Image
            src={logo}
            preview={false}
            width={32} // Adjusted size for better mobile view
            alt="Logo"
            className="mr-2"
          />
        )}
        <span className="text-white text-lg sm:text-xl font-semibold ml-2 sm:ml-4">ProMonitor</span>
      </div>

      {/* Buttons for Login and Signup */}
      <div className="sm:flex space-x-4">
       {buttons && buttons.map((button, index) => (
        <div className='flex justify-center items-center space-x-4 pr-2' key={index}>{button}</div>
       ))}
      </div>
    </Header>
  );
};

export default AppHeader;
