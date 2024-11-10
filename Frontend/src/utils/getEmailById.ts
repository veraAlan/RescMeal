import axios from 'axios';

export const getEmailById = async (id: number): Promise<string> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/email/${id}`, {
        withCredentials: true,
    });
    if (response.status !== 200) {
        throw new Error('Error obteniendo el email');
    }
    if (!response.data || typeof response.data !== 'string') {
        throw new Error('Formato de respuesta incorrecto');
    }
    return response.data;
};
