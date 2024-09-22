import axios from 'axios';

export const getMonitoria = async () => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`http://localhost:3000/api/monitores/monitoria/dados`,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        throw error;
    }
};

// Serviço para obter uma tarefa específica
export const getTarefaService = async (codigo_tarefa) => {
    const token = localStorage.getItem('token');
    const codigo_usuario = localStorage.getItem('codigo_usuario')

    try {
        const response = await axios.get(`http://localhost:3000/api/monitores/tarefas/${codigo_usuario}/${codigo_tarefa}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Frontend Error:', error.response?.data || error.message);
        throw error; 
    }
};

// Serviço para obter os anexos de uma tarefa específica
export const getAnexosTarefaService = async (codigo_tarefa) => {
    const token = localStorage.getItem('token');
    const codigo_usuario = localStorage.getItem('codigo_usuario');
    try {
        const response = await axios.get(`http://localhost:3000/api/monitores/tarefas/${codigo_usuario}/${codigo_tarefa}/download`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            responseType: 'blob'
        });
        return response;
    }
    catch (error) {
        throw error;
    }
};

// Serviço para enviar a resposta de um monitor a uma tarefa
export const submitTarefaService = async (codigo_tarefa, formData) => {
    const token = localStorage.getItem('token')
    const codigo_usuario = localStorage.getItem('codigo_usuario');

    try {
        const response = await axios.put(`http://localhost:3000/api/monitores/tarefas/${codigo_usuario}/${codigo_tarefa}/submit`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response;
    } catch (error) {
        console.error('Frontend Error:', error.response?.data || error.message);
        throw error; // Lança o erro para ser tratado no frontend
    }
};

// Serviço para obter todas as tarefas de um monitor
export const getMonitorTarefasService = async () => {
    const token = localStorage.getItem('token');
    const codigo_usuario = localStorage.getItem('codigo_usuario');
    console.log("Chegou no normal")
    try {
        const response = await axios.get(`http://localhost:3000/api/monitores/tarefas/${codigo_usuario}`, {
            headers: {
                
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Frontend Error:', error.response?.data || error.message);
        throw error; // Lança o erro para ser tratado no frontend
    }
};