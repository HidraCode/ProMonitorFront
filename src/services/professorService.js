import axios from 'axios';

// rota para obter relatorios e frequencias de um prof
export const getRelatoriosEFrequencias = async () => {
    const token = localStorage.getItem('token');
    const codigo_usuario = localStorage.getItem('codigo_usuario');

    try {
        const response = await axios.get(`http://localhost:3000/api/professores/relatorios-frequencias/${codigo_usuario}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login:', error.response?.data || error.message);
        throw error; // Lança o erro para ser tratado no frontend
    }
};

export default getRelatoriosEFrequencias;