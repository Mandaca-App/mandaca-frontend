import { API_URL } from '@/constants/api';
import { Enterprise } from '@/types/enterprise';
import axios from 'axios';

export const getEnterprise = async (
  enterpriseId: string,
): Promise<Enterprise> => {
  const response = await axios.get(`${API_URL}/enterprises/${enterpriseId}`);

  return response.data;
};

export const updateEnterpriseStory = async (
  enterpriseId: string,
  historia: string,
): Promise<void> => {
  await axios.put(`${API_URL}/enterprises/${enterpriseId}`, { historia });
};
