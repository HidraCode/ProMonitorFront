import React from 'react';
import { Avatar, Row, Col, Tag } from 'antd';
import { FaCircleUser } from "react-icons/fa6";

const AnaliseCard = ({ nome, data, status, tipo }) => {
  return (
    <Row className='h-14 border-gray-300 border-y' >
      <Col span={2} className='flex items-center justify-center'>
        <FaCircleUser className='w-6 h-6 text-gray-300' />
      </Col>
      <Col span={7} className='flex items-center font-semibold'>{nome}</Col>
      <Col span={5} className='flex items-center justify-center'>{data}</Col>
      <Col span={5} className='flex items-center justify-center'>{ status === 'aprovado' ? <li className='text-green-600'>Aprovado</li> : <li className='text-red-600'>Pendente</li>}</Col>
      <Col span={5} className='flex items-center justify-center'>
        { tipo === 'semestral' ?
          <div className='border-2 rounded-md text-[#52C41A] border-[#B7EB8F] bg-[#F6FFED] px-4'>Relatório semestral</div> :
          <div className='border-2 rounded-md text-[#4866E0] border-[#ADC6FF] bg-[#F0F5FF] px-4'>Relatório final</div>
        }
      </Col>
    </Row>
  );
};

export default AnaliseCard;