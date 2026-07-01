import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/api';
import { useAuth } from '@/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo um tipo único que engloba as propriedades necessárias
export type UserData = {
  id_usuario: string;
  nome: string;
  email: string;
  telefone: string;
  url_foto_usuario: string;
};

type UserContextData = {
  user: UserData | null;
  isLoading: boolean;
  updateUser: (data: Partial<UserData>) => Promise<void>;
  updatePhoto: (uri: string) => Promise<void>;
};

const UserContext = createContext<UserContextData | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

const USER_STORAGE_KEY = '@mandaca:user_data';

export const UserProvider = ({ children }: UserProviderProps) => {
  const { userId } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Busca dados do backend ou AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        // Tenta pegar cache primeiro (para a foto ou dados modificados offline)
        const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
        let cachedUser: UserData | null = null;
        if (stored) {
          cachedUser = JSON.parse(stored);
        }

        // Tenta atualizar via API (apenas nome e foto vêm por enquanto pela modelagem da API vista)
        const responseUser = await axios.get(`${API_URL}/users/${userId}`);
        
        // Mesclando os dados (dando prioridade aos novos dados da API, mas retendo campos locais como telefone)
        const mergedUser: UserData = {
          id_usuario: responseUser.data.id_usuario || userId,
          nome: responseUser.data.nome || cachedUser?.nome || 'Usuário',
          email: responseUser.data.email || cachedUser?.email || '',
          telefone: responseUser.data.telefone || cachedUser?.telefone || '',
          url_foto_usuario: cachedUser?.url_foto_usuario || responseUser.data.url_foto_usuario || '',
        };

        setUser(mergedUser);
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mergedUser));

      } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
        // Em caso de falha de rede, tenta usar o que está no AsyncStorage
        const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    } else {
      setIsLoading(false);
      setUser(null);
    }
  }, [userId]);

  const updateUser = useCallback(async (data: Partial<UserData>) => {
    if (!user) return;
    try {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      // TODO: Chamada para API para salvar dados do perfil (PUT /users/:id)
    } catch (error) {
      console.error('Erro ao atualizar usuário localmente:', error);
      throw error;
    }
  }, [user]);

  const updatePhoto = useCallback(async (uri: string) => {
    if (!user) return;
    try {
      const updatedUser = { ...user, url_foto_usuario: uri };
      setUser(updatedUser);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      // TODO: Chamada de API multipart/form-data para enviar a imagem (ex: PUT /users/:id/photo)
    } catch (error) {
      console.error('Erro ao salvar foto:', error);
      throw error;
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, isLoading, updateUser, updatePhoto }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextData => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};
