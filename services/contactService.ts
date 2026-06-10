import { API_URL } from '@/constants/api';
import { ContactResponse } from '@/types/contact';
import axios from 'axios';

export const getContacts = async (): Promise<ContactResponse[]> => {
  try {
    const response = await axios.get<ContactResponse[]>(`${API_URL}/contacts/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    return [];
  }
};
