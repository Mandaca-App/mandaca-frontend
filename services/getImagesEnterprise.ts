import axios from 'axios';

export interface Photo {
    id_foto: string;
    url_foto_empresa: string;
    empresa_id: string;
}

const BASE_URL = 'https://mandaca-backend.onrender.com';

export const getImagesEnterprise = async (enterpriseId: string): Promise<Photo[]> => {
    try {
        const response = await axios.get(
            `${BASE_URL}/photos/enterprise/${enterpriseId}`,
        );

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar fotos da empresa:', error);
        throw error;
    }
};