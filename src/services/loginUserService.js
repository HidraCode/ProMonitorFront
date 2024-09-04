import axios from 'axios';

// Serviço para autenticar o usuário
export const loginUserService = async (values) => {
    try {
        // Envia as credenciais de login (e-mail e senha) para o back-end
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email: values.email,
            password: values.password,
            tipo_usuario: values.tipo_usuario, // Inclua o tipo de usuário
        });

        // Se o login for bem-sucedido, o back-end deve retornar um token ou informações do usuário
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login:', error.response?.data || error.message);
        throw error; // Lança o erro para ser tratado no frontend
    }
};

export default loginUserService;
