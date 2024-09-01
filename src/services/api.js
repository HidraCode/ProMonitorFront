// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createUser = async (userData) => {
    const endpoint = userData.tipo === 'aluno' ? '/alunos' : '/professores';
    try {
        const response = await api.post(endpoint, userData);
        return response.data;
    } catch (error) {
        console.error('Erro na criação do usuário:', error);
        throw error;
    }
};

export default api;
