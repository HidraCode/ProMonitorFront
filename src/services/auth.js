import axios from 'axios';

export const recuperarSenhaService = async (values, resend) => {
    try {
        const requestData = { email: values.email, resend: resend };
        const response = await axios.post('http://localhost:3000/api/auth/pass-recovery', requestData);
        return response;
    } catch (error) {
        // Lida com erro da requisição
        console.error('Frontend Error:', error.response?.data || error.message);
        throw error; // Lança o erro para ser tratado no frontend
    }
};

export const verificarCodigoService = async (values, token) => {
    try {
        // Envia o token e o código de recuperação para o back-end
        const response = await axios.post('http://localhost:3000/api/auth/pass-recovery/verify-code', {
            token,
            verification_code: values.verification_code
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Erro ao verificar código:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const redefinirSenhaService = async (token, values) => {
    try {
        // Envia o token e o código de recuperação para o back-end
        const response = await axios.post('http://localhost:3000/api/auth/pass-reset', {
            token,
            values: values
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error.response ? error.response.data : error.message);
        throw error;
    }
};