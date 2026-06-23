import { API_URL } from '@/constants/api';
import axios from 'axios';

export type RegisterPayload = {
  email: string;
  password: string;
  tipo_usuario: 'empreendedor' | 'turista';
  nome: string;
  cpf: string;
};

export type RegisterResponse = {
  id_usuario: string;
  auth_user_id: string;
  email: string;
  tipo_usuario: string;
  nome: string;
  cpf: string;
};

export const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const response = await axios.post(`${API_URL}/auth/register`, payload);
  return response.data;
};
