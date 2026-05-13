import { API_URL } from '@/constants/api';
import { Enterprise } from '@/types/enterprise';
import axios from 'axios';

export const getEnterprise = async (
  enterpriseId: string,
): Promise<Enterprise> => {
  const response = await axios.get(`${API_URL}/enterprises/${enterpriseId}`);

  return response.data;
};

type UpdateEnterprisePayload = {
    nome: string;
    especialidade: string;
    endereco: string;
    telefone: string;
    hora_abrir: string;
    hora_fechar: string;
    historia: string;
};

export const updateEnterpriseStory = async (
    enterpriseId: string,
    data: UpdateEnterprisePayload,
): Promise<void> => {
    await axios.put(
        `${API_URL}/enterprises/${enterpriseId}`,
        data,
    );
};