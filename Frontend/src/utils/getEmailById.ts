import axiosConfig from './axiosConfig';

export const getEmailById = async (id: number): Promise<string> => {
    const response = await axiosConfig.get(`/api/auth/email/${id}`);
    if (response.status !== 200) {
        throw new Error('Error obteniendo el email');
    }
    if (!response.data || typeof response.data !== 'string') {
        throw new Error('Formato de respuesta incorrecto');
    }
    return response.data;
};
