import { API_URL } from '@/constants/api';
import axios from 'axios';

export interface User {
  id_usuario: string;
  nome: string;
  email: string;
}

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário ${userId}:`, error);
    return null;
  }
};
