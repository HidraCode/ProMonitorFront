import { Button, Col, Row } from 'antd';
import React from 'react';
import { DownloadOutlined } from '@ant-design/icons'
import { FaCircleUser } from 'react-icons/fa6';

const MonitorCard = ({ nome, data }) => {

  const handleBaixarAnexo = () => {
    // TODO deve baixar os anexos dos retornos das atividades
  }

  return (
    <Col span={24}>
      <Row className="border-y border-gray-300 h-14" >
        <Col span={2} className="flex justify-center items-center">
          <FaCircleUser className='w-6 h-6' />
        </Col>
        <Col span={10} className="flex justify-start font-semibold items-center">{nome}</Col>
        <Col span={7} className="flex justify-center items-center">
          {data}
        </Col>
        <Col span={5} className="flex justify-center items-center">
          <Button className="border border-gray-300" type='link' onClick={handleBaixarAnexo} icon={<DownloadOutlined className='text-black' />} />
        </Col>
      </Row>
    </Col>
  );
};

export default MonitorCard;