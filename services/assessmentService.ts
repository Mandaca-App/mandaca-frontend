import { API_URL } from '@/constants/api';
import { ReviewSentiment } from '@/types/reviewSentiment';
import axios from 'axios';

export interface Assessment {
  id_avaliacao: string;
  texto: string;
  tipo_avaliacao: ReviewSentiment;
  usuario_id: string;
  usuario_nome?: string;
  empresa_id: string;
  created_at?: string;
}

export const getAssessmentsByEnterprise = async (
  enterpriseId: string,
): Promise<Assessment[]> => {
  const response = await axios.get(
    `${API_URL}/assessments/by-enterprise/${enterpriseId}`,
  );
  return response.data;
};

export const getAllAssessments = async (): Promise<Assessment[]> => {
  const response = await axios.get(`${API_URL}/assessments`);
  return response.data;
};

export const getAssessmentById = async (
  assessmentId: string,
): Promise<Assessment> => {
  const response = await axios.get(`${API_URL}/assessments/${assessmentId}`);
  return response.data;
};

export const createAssessment = async (
  texto: string,
  usuarioId: string,
  empresaId: string,
): Promise<Assessment> => {
  const response = await axios.post(`${API_URL}/assessments`, {
    texto,
    usuario_id: usuarioId,
    empresa_id: empresaId,
  });
  return response.data;
};

export const updateAssessment = async (
  assessmentId: string,
  data: Partial<{
    texto: string;
    usuario_id: string;
    empresa_id: string;
  }>,
): Promise<Assessment> => {
  const response = await axios.put(
    `${API_URL}/assessments/${assessmentId}`,
    data,
  );
  return response.data;
};

export const deleteAssessment = async (assessmentId: string): Promise<void> => {
  await axios.delete(`${API_URL}/assessments/${assessmentId}`);
};
