import axios from 'axios';

// serviço para um professor criar edital de monitoria
export const createEditalService = async (values) => {
    try {
        const codigo_professor = localStorage.getItem('codigo_usuario');
        const response = await axios.post('http://localhost:3000/api/editais', {
            codigo_professor,
            titulo: values.titulo,
            disciplina: values.disciplina,
            data_inicio: values.data_inicio,
            data_fim: values.data_fim,
            descricao: values.descricao,
            link: values.link,
            publico: true,
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login:', error.response?.data || error.message);
        throw error;
    }
};