// src/services/photoService.ts

import { ImageEnterprise } from '@/types/imageEnterprise';
import axios from 'axios';

import { API_URL } from '@/constants/api';

export const getImagesByEnterprise = async (
  enterpriseId: string,
): Promise<ImageEnterprise[]> => {
  const response = await axios.get(
    `${API_URL}/photos/enterprise/${enterpriseId}`,
  );

  return response.data;
};

export const deleteImage = async (photoId: string): Promise<void> => {
  await axios.delete(`${API_URL}/photos/${photoId}`);
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

  await axios.post(`${API_URL}/photos/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
