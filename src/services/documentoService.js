import axios from "axios"

export const enviarFrequenciaService = async (dados) => {
    const token = localStorage.getItem('token');
    
    try {
        const response = await axios.post('http://localhost:3000/api/monitores/enviar-frequencia', dados, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (error) {
        console.error('Erro ao enviar a frequêcia', error);
    }
};

export const assinarFrequenciaService = async (documentId, dados) => {
    const token = localStorage.getItem('token');
    const requestData = { documentId, dados }
    const codigo_usuario = localStorage.getItem('codigo_usuario');
    
    try {
        const response = await axios.post(`http://localhost:3000/api/professores/${codigo_usuario}/assinar-frequencia`, requestData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        throw error;
    }
}

export const getFrequencia = async (documentId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`http://localhost:3000/api/frequencia/${documentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        throw error;
    }
}

export const baixarFrequencia = async (documentId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`http://localhost:3000/api/frequencia/baixar/${documentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            responseType: 'blob' // Indica que a resposta deve ser tratada como um blob
        })
        return response;
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
    }
}

export const autenticarFrequencia = async (documentId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`http://localhost:3000/api/frequencia/autenticar/${documentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        throw error;
    }
}

export const enviarRelatorioService = async (dados) => {
    const token = localStorage.getItem('token');
    
    try {
        const response = await axios.post('http://localhost:3000/api/monitores/enviar-relatorio', dados, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (error) {
        console.error('Erro ao enviar a frequêcia', error);
    }
};

export const assinarRelatorioService = async (documentId, dados) => {
    const token = localStorage.getItem('token');
    const codigo_usuario = localStorage.getItem('codigo_usuario');

    const requestData = { documentId, dados }
    try {
        const response = await axios.post(`http://localhost:3000/api/professores/${codigo_usuario}/assinar-relatorio`, requestData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        throw error;
    }
}

export const getRelatorio = async (documentId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`http://localhost:3000/api/relatorio/${documentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        throw error;
    }
}

export const baixarRelatorio = async (documentId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`http://localhost:3000/api/relatorio/baixar/${documentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            responseType: 'blob' // Indica que a resposta deve ser tratada como um blob
        })
        return response;
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
    }
}

export const autenticarRelatorio = async (documentId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`http://localhost:3000/api/relatorio/autenticar/${documentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response;
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        throw error;
    }
}

