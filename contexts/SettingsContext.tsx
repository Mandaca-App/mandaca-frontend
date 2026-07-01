import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_STORAGE_KEY = '@mandaca:settings';

// --- Types ---

type ThemePreference = 'light' | 'dark' | 'auto';

type NotificationPreferences = {
  enabled: boolean;
  newReservations: boolean;
  newReviews: boolean;
  aiSuggestions: boolean;
  chatMessages: boolean;
};

type SettingsData = {
  theme: ThemePreference;
  notifications: NotificationPreferences;
};

type SettingsContextData = {
  settings: SettingsData;
  isLoading: boolean;
  setTheme: (theme: ThemePreference) => void;
  setNotifications: (notifications: NotificationPreferences) => void;
  toggleAllNotifications: (enabled: boolean) => void;
};

// --- Defaults ---

const defaultNotifications: NotificationPreferences = {
  enabled: true,
  newReservations: true,
  newReviews: true,
  aiSuggestions: true,
  chatMessages: true,
};

const defaultSettings: SettingsData = {
  theme: 'auto',
  notifications: defaultNotifications,
};

// --- Context ---

const SettingsContext = createContext<SettingsContextData | undefined>(
  undefined,
);

type SettingsProviderProps = {
  children: React.ReactNode;
};

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Referência para o último estado individual dos toggles (antes de desativar geral)
  const [savedIndividual, setSavedIndividual] = useState<
    Omit<NotificationPreferences, 'enabled'>
  >({
    newReservations: true,
    newReviews: true,
    aiSuggestions: true,
    chatMessages: true,
  });

  // Carrega preferências do AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);

        if (stored) {
          const parsed = JSON.parse(stored) as SettingsData;
          setSettings(parsed);
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Persiste no AsyncStorage sempre que as settings mudam
  const persistSettings = useCallback(async (newSettings: SettingsData) => {
    try {
      await AsyncStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(newSettings),
      );
      // TODO: Sincronizar com API de preferências do usuário (PUT /users/:id/preferences)
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  }, []);

  const setTheme = useCallback(
    (theme: ThemePreference) => {
      const updated = { ...settings, theme };
      setSettings(updated);
      persistSettings(updated);
    },
    [settings, persistSettings],
  );

  const setNotifications = useCallback(
    (notifications: NotificationPreferences) => {
      const updated = { ...settings, notifications };
      setSettings(updated);
      persistSettings(updated);
    },
    [settings, persistSettings],
  );

  const toggleAllNotifications = useCallback(
    (enabled: boolean) => {
      if (!enabled) {
        // Salva o estado individual atual antes de desativar tudo
        const { enabled: _e, ...individual } = settings.notifications;
        setSavedIndividual(individual);

        const updated: SettingsData = {
          ...settings,
          notifications: {
            enabled: false,
            newReservations: false,
            newReviews: false,
            aiSuggestions: false,
            chatMessages: false,
          },
        };

        setSettings(updated);
        persistSettings(updated);
      } else {
        // Restaura o último estado individual
        const updated: SettingsData = {
          ...settings,
          notifications: {
            enabled: true,
            ...savedIndividual,
          },
        };

        setSettings(updated);
        persistSettings(updated);
      }
    },
    [settings, savedIndividual, persistSettings],
  );

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        setTheme,
        setNotifications,
        toggleAllNotifications,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextData => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
  }

  return context;
};

export type { ThemePreference, NotificationPreferences, SettingsData };
