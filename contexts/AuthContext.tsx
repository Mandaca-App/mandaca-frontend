import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const AUTH_TOKEN_KEY = '@mandaca:auth_token';
const USER_ID_KEY = '@mandaca:user_id';

// TODO: Substituir pelo ID real do usuário autenticado quando o backend de auth estiver pronto
const HARDCODED_USER_ID = '453df15b-61ce-4571-8bdb-cdbedf0ff041';

type AuthContextData = {
  userId: string;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // TODO: Substituir por estado real carregado do SecureStore/AsyncStorage após login
  const [userId] = useState<string>(HARDCODED_USER_ID);

  const logout = useCallback(async () => {
    try {
      // TODO: Chamar endpoint de logout no backend (POST /auth/logout) para invalidar o token JWT
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_ID_KEY]);

      // Reseta navegação para a tela inicial (login)
      router.replace('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userId, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};
