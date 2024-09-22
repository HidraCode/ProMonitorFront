import React, { useEffect, useRef, useState } from 'react';
import { Pie } from '@antv/g2plot';
import { theme } from 'antd';
import { useMediaQuery } from 'react-responsive';

const TarefasChart = ({ data }) => {

  const containerRef = useRef(null);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  // Valor default para os dados
  const [chartData, setChartData] = useState([])

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

    const concluidas = tarefasFiltradas.filter(tarefa => tarefa.status === 'concluida') || [];
    const pendentes = tarefasFiltradas.filter(tarefa => tarefa.status === 'pendente') || [];
    const atrasadas = tarefasFiltradas.filter(tarefa => tarefa.status === 'atrasada') || [];

    setChartData(
      [
        { type: 'Concluídas', value: concluidas.length },
        { type: 'Pendentes', value: pendentes.length },
        { type: 'Atrasadas', value: atrasadas.length },
      ]
    );
  }, [data]); // Dependência para reagir quando `data` mudar


  useEffect(() => {
    if (containerRef.current) {
      // Construção do gráfico
      const piePlot = new Pie(containerRef.current, {
        appendPadding: 0,
        data: chartData,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        height: 200,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 12,
          },
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: isSmallScreen ? 12 : 16,
            },
            content: `Tarefas`,
          },
        },
      });

      piePlot.render();

      const handleResize = () => {
        piePlot.changeSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        piePlot.destroy();
      };
    }
  }, [chartData]);

  return (
    <div className='w-full'>
      <div className="text-[#365486] font-semibold font-['Poppins'] md:text-xl xs:text-base tracking-tighter mb-4">Seu desempenho</div>
      <div ref={containerRef} className={`w-full h-full ${isSmallScreen ? '' : 'p-2'}`} style={{ height: isSmallScreen ? '150px' : '200px' }} />
    </div>
  );
};

export default TarefasChart;
