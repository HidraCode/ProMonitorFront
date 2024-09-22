import { Button, Col, Row } from 'antd';
import React from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { FilePdfOutlined, DownloadOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from 'react-router-dom';

const AtividadeCard = ({ titulo, conteudo, tipo, professor, data, anexos }) => {

  const navigate = useNavigate()
  const id = useParams() //coloquem, no lugar do use params, o ip da atividade, exemplo : const id = data.id

  const handleVerDetalhes = () => {
    navigate("/professor/atividade/{id}")
  }

  return (
    <div className='py-4'>
        <Row className='border border-gray-300 rounded-lg h-50  p-2' onClick={handleVerDetalhes}>
          <Col span={20}>
            <Row>
              <Col className='font-semibold'>
                {titulo}
              </Col>
              <Col className='pl-10'>
              { 
                tipo === 'tarefa' ?  
                <div className='border rounded-md text-[#52C41A] border-[#B7EB8F] bg-[#F6FFED] px-4'>Tarefa</div> :
                <div className='border rounded-md text-[#4866E0] border-[#ADC6FF] bg-[#F0F5FF] px-4'>Material de apoio</div>
              }
              </Col>
            </Row>
            <Row className='py-2 text-xs'>{conteudo}</Row>
            <hr/>
            { 
              anexos === true &&
              <Row>
                <Col className='p-1'><FilePdfOutlined /></Col>
                <Col className='p-1'>Anexos:</Col>
                <div className='p-1'>
                  <Button icon={<DownloadOutlined />} size='small'>Baixar anexos</Button>
                </div>
              </Row>
            }
            
            <Row className='pt-3'>
              <Col>
                <FaCircleUser />
              </Col>
              <Col className='text-xs px-1'>
                {professor}
              </Col>
              <Col className='text-xs text-gray-400'>
                {data}
              </Col>
            </Row>
          </Col>
        </Row>
    </div>
  );
};

export default AtividadeCard;