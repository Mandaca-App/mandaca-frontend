import { API_URL } from '@/constants/api';
import axios from 'axios';

export interface Reservation {
  id_reserva: string;
  num_mesas: number;
  num_pessoas: number;
  mensagem?: string;
  status: 'aguardando' | 'aceito';
  usuario_id?: string;
  empresa_id?: string;
}

export interface ReservationCreate {
  num_mesas: number;
  num_pessoas: number;
  mensagem?: string;
  usuario_id?: string;
  empresa_id: string;
}

export interface User {
  id_usuario: string;
  nome: string;
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const reservationService = {
  async getByEnterprise(empresaId: string): Promise<Reservation[]> {
    const { data } = await api.get(`/reservations/by-enterprise/${empresaId}`);
    return data;
  },

  async getByUser(usuarioId: string): Promise<Reservation[]> {
    const { data } = await api.get(`/reservations/by-user/${usuarioId}`);
    return data;
  },

  async getById(reservationId: string): Promise<Reservation> {
    const { data } = await api.get(`/reservations/${reservationId}`);
    return data;
  },

  async create(payload: ReservationCreate): Promise<Reservation> {
    const { data } = await api.post('/reservations/', payload);
    return data;
  },

  async accept(reservationId: string): Promise<Reservation> {
    const { data } = await api.patch(`/reservations/${reservationId}/accept`);
    return data;
  },

  async cancel(reservationId: string): Promise<void> {
    await api.delete(`/reservations/${reservationId}`);
  },

  async getUserById(usuarioId: string): Promise<User | null> {
    try {
      const { data } = await api.get(`/users/${usuarioId}`);
      return data;
    } catch (error) {
      console.error(`Erro ao buscar usuário ${usuarioId}:`, error);
      return null;
    }
  },
};
