import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const MateriaisDeApoio = ({data}) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const [materiais, setMateriais] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let tarefasData = Array.isArray(data) ? data : [];
    
        // Se data não for um array, tenta pegar do sessionStorage
        if (!Array.isArray(data)) {
            const storedData = JSON.parse(sessionStorage.getItem('tarefas'));
            // Se storedData for um objeto, extraímos os valores
            tarefasData = Array.isArray(storedData) ? storedData : Object.values(storedData || {});
        }
        
        // Filtrar tarefas do tipo 'tarefa'
        const tarefasFiltradas = tarefasData.filter(tarefa => tarefa.tipo === 'material');
        setMateriais(tarefasFiltradas);
    }, [data]);

    const handleMaterialSelection = (item) => {
        navigate(`/monitor/material-de-apoio/${item.codigo_tarefa}`)
    };

    return (
        <div className='w-full h-full'>
            <div className="mb-4 flex justify-between items-center">
                <div className="text-[#365486] font-semibold font-['Poppins'] md:text-xl xs:text-base tracking-tighter">
                    Materiais de apoio
                </div>
            </div>
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    pageSize: 2,
                    simple: isSmallScreen,
                }}
                dataSource={materiais}
                split={true}
                renderItem={(item) => (
                    <List.Item
                        key={item.codigo_tarefa}
                        className="cursor-pointer hover:bg-gray-50 transition duration-200"
                        onClick={() => handleMaterialSelection(item)}
                    >
                        <List.Item.Meta
                            title={
                                <span className="text-gray-600 font-medium">
                                    {item.titulo}
                                </span>
                            }
                            description={
                                <div
                                    className="text-gray-600"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {item.descricao}
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MateriaisDeApoio;
