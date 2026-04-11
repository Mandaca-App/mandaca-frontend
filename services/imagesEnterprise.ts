// src/services/photoService.ts

import { ImageEnterprise } from '@/types/imageEnterprise';
import axios from 'axios';

const BASE_URL = 'https://mandaca-backend.onrender.com';

export const getImagesByEnterprise = async (enterpriseId: string): Promise<ImageEnterprise[]> => {
    const response = await axios.get(
        `${BASE_URL}/photos/enterprise/${enterpriseId}`,
    );

    return response.data;
};

export const deleteImage = async (photoId: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/photos/${photoId}`);
};

export const uploadImage = async (
    imageUri: string,
    empresa_id: string,
): Promise<void> => {
    const formData = new FormData();

    formData.append('empresa_id', empresa_id);

    formData.append('files', {
        uri: imageUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
    } as any);

    await axios.post(`${BASE_URL}/photos/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};