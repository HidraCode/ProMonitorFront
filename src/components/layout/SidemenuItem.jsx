import React from 'react';
import { useNavigate } from 'react-router-dom';

const SidemenuItem = ({ icon, label, path }) => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center items-center z-10'>
      <button onClick={() => navigate(path)} className="flex items-center space-x-2 p-5 h-12 w-5/6 text-left text-custom-blue bg-white hover:bg-custom-blue hover:text-white rounded-xl">
        {icon && <div className="text-lg font-black">{icon}</div>}
        {label && <span className="font-semibold" >{label}</span>}
      </button>
    </div>
  );
};

export default SidemenuItem;