import axios from 'axios';

// serviço para atualizar dados de um aluno
export const updateStudentService = async (values) => {
    try {
        // para filtrar os campos que foram preenchidos
        const payload = {};

        // percorre os campos que podem ser enviados e só adiciona os que foram fornecidos
        if (values.nome) payload.nome = values.nome;
        if (values.matricula) payload.matricula = values.matricula;
        if (values.cpf) payload.cpf = values.cpf;
        if (values.telefone) payload.telefone = values.telefone;
        if (values.data_nascimento) payload.data_nascimento = values.data_nascimento;
        if (values.email) payload.email = values.email;

        // a senha é obrigatória
        if (values.senha) {
            payload.senha = values.senha;
        } else {
            throw new Error('Senha é obrigatória');
        }

        // recupera o codigo_usuario
        const codigo_usuario = localStorage.getItem('codigo_usuario');
        if (!codigo_usuario) {
            throw new Error('Usuário não está logado ou código não encontrado');
        }
    
        const response = await axios.put(`http://localhost:3000/api/alunos/${codigo_usuario}`, payload);

        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar dados de aluno: ' + error.response?.data);
        throw error;
    }
};