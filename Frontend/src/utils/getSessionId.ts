import axios from 'axios';

export const getSessionId = async (): Promise<number> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/session-id`, {
        withCredentials: true,
    });
    if (response.status !== 200) {
        throw new Error('Error obteniendo el ID de la sesión');
    }
    return response.data;
};