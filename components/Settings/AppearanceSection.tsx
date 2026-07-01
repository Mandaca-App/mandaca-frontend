import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSettings } from '@/contexts/SettingsContext';
import type { ThemePreference } from '@/contexts/SettingsContext';
import { SectionCard } from './SectionCard';

type Props = {
  isDark?: boolean;
};

type ThemeOption = {
  key: ThemePreference;
  label: string;
  icon: 'sunny-outline' | 'moon-outline' | 'phone-portrait-outline';
};

const themeOptions: ThemeOption[] = [
  { key: 'light', label: 'Claro', icon: 'sunny-outline' },
  { key: 'dark', label: 'Escuro', icon: 'moon-outline' },
  { key: 'auto', label: 'Automático', icon: 'phone-portrait-outline' },
];

export const AppearanceSection = ({ isDark = false }: Props) => {
  const { settings, setTheme } = useSettings();

  return (
    <SectionCard title="Aparência" icon="color-palette-outline" isDark={isDark}>
      <View className="flex-row gap-3">
        {themeOptions.map((option) => {
          const isSelected = settings.theme === option.key;

          return (
            <Pressable
              key={option.key}
              onPress={() => setTheme(option.key)}
              className={`flex-1 items-center gap-2 py-4 rounded-2xl border ${
                isSelected
                  ? 'bg-primary border-primary'
                  : isDark
                    ? 'bg-[#2A2A2A] border-white/10'
                    : 'bg-light border-black/10'
              }`}
              accessibilityLabel={`Tema ${option.label}`}
              accessibilityRole="button"
            >
              <Ionicons
                name={option.icon}
                size={24}
                color={isSelected ? '#FFFFFF' : isDark ? '#AAA' : '#666'}
              />
              <Text
                className={`text-sm font-semibold ${
                  isSelected
                    ? 'text-light'
                    : isDark
                      ? 'text-white/70'
                      : 'text-dark'
                }`}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SectionCard>
  );
};
