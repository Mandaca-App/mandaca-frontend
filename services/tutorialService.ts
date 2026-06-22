import axios from 'axios';
import { API_URL } from '@/constants/api';
import { Tutorial, CategoriaTutorial } from '@/types/tutorial';

export const getTutorials = async (
  categoria?: CategoriaTutorial,
): Promise<Tutorial[]> => {
  try {
    const response = await axios.get<Tutorial[]>(`${API_URL}/api/tutoriais`, {
      params: categoria ? { categoria } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tutoriais:', error);
    return [];
  }
};
