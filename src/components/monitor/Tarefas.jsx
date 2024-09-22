import React, { useEffect, useState } from 'react';
import { List, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FilterOutlined } from '@ant-design/icons';

const { Option } = Select;

const Tarefas = ({ data }) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const [selectedValue, setSelectedValue] = useState('sem filtro');
    const [filteredTarefas, setFilteredTarefas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let tarefasData = Array.isArray(data) ? data : [];

        // Se data não for um array, tenta pegar do sessionStorage
        if (!Array.isArray(data)) {
            const storedData = JSON.parse(sessionStorage.getItem('tarefas'));
            // Se storedData for um objeto, extraímos os valores
            console.log(data)
            tarefasData = Array.isArray(storedData) ? storedData : Object.values(storedData || {});
            console.log(tarefasData)

        }

        // Filtrar tarefas do tipo 'tarefa'
        const tarefasFiltradas = tarefasData.filter(tarefa => tarefa.tipo === 'tarefa');
        setFilteredTarefas(tarefasFiltradas);
    }, [data]);


    useEffect(() => {
        let tarefasData = Array.isArray(data) ? data : [];

        // Se data não for um array, tenta pegar do sessionStorage
        if (!Array.isArray(data)) {
            const storedData = JSON.parse(sessionStorage.getItem('tarefas'));
            // Se storedData for um objeto, extraímos os valores
            tarefasData = Array.isArray(storedData) ? storedData : Object.values(storedData || {});
        }

        // Filtrar tarefas do tipo 'tarefa'
        const tarefasFiltradas = tarefasData.filter(tarefa => tarefa.tipo === 'tarefa');
        // Filtra tarefas de acordo com o valor selecionado pelo usuário
        if (selectedValue != 'sem filtro') {
            const filtro = tarefasFiltradas.filter(tarefa => tarefa.status === selectedValue);
            setFilteredTarefas(filtro);

        } else {
            setFilteredTarefas(tarefasFiltradas);
        }

    }, [selectedValue]);

    const handleSelectChange = (value) => {
        setSelectedValue(value);
    };

    const handleTaskSelection = (item) => {
        navigate(`/monitor/tarefas/${item.codigo_tarefa}`);
    };

    return (
        <div className='w-full h-full'>
            <div className="mb-4 flex justify-between items-center">
                <div className="text-[#365486] font-semibold font-['Poppins'] md:text-xl xs:text-base tracking-tighter">
                    Tarefas
                </div>
                <div className='flex flex-row gap-2'>
                    <FilterOutlined className="text-base text-gray-400" />
                    <Select
                        value={selectedValue}
                        onChange={handleSelectChange}
                        style={{ width: isSmallScreen ? '120px' : '150px' }}
                    >
                        <Option value="concluida">Concluídas</Option>
                        <Option value="pendente">Pendentes</Option>
                        <Option value="atrasada">Em atraso</Option>
                        <Option value="sem filtro">Sem filtro</Option>
                    </Select>
                </div>
            </div>
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    pageSize: 2,
                    simple: isSmallScreen,
                }}
                dataSource={filteredTarefas}
                split={true}
                renderItem={(item) => (
                    <List.Item
                        key={item.codigo_tarefa}
                        className="cursor-pointer hover:bg-gray-50 transition duration-200"
                        onClick={() => handleTaskSelection(item)}
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

export default Tarefas;
