import { Switch, Text, View } from 'react-native';
import { useSettings } from '@/contexts/SettingsContext';
import { SectionCard } from './SectionCard';

type Props = {
  isDark?: boolean;
};

type ToggleItem = {
  key: 'newReservations' | 'newReviews' | 'aiSuggestions' | 'chatMessages';
  label: string;
};

const toggleItems: ToggleItem[] = [
  { key: 'newReservations', label: 'Novas reservas' },
  { key: 'newReviews', label: 'Novas avaliações' },
  { key: 'aiSuggestions', label: 'Sugestões da IA / relatórios' },
  { key: 'chatMessages', label: 'Mensagens do chat' },
];

export const NotificationsSection = ({ isDark = false }: Props) => {
  const { settings, setNotifications, toggleAllNotifications } = useSettings();
  const { notifications } = settings;

  const handleToggleIndividual = (key: ToggleItem['key'], value: boolean) => {
    setNotifications({
      ...notifications,
      [key]: value,
    });
  };

  const activeTrackColor = '#C34342';
  const inactiveTrackColor = isDark ? '#333' : '#D1D5DB';
  const thumbColor = '#FFFFFF';

  return (
    <SectionCard title="Notificações" icon="notifications-outline" isDark={isDark}>
      <View className="gap-4">
        {/* Toggle geral */}
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-base font-semibold ${
              isDark ? 'text-white' : 'text-dark'
            }`}
            accessibilityLabel="Ativar todas as notificações"
          >
            Ativar notificações
          </Text>
          <Switch
            value={notifications.enabled}
            onValueChange={toggleAllNotifications}
            trackColor={{
              false: inactiveTrackColor,
              true: activeTrackColor,
            }}
            thumbColor={thumbColor}
            accessibilityLabel="Toggle geral de notificações"
          />
        </View>

        {/* Separador */}
        <View
          className={`h-[1px] ${isDark ? 'bg-white/10' : 'bg-black/5'}`}
        />

        {/* Toggles individuais */}
        {toggleItems.map((item) => (
          <View
            key={item.key}
            className="flex-row items-center justify-between"
          >
            <Text
              className={`text-sm ${
                !notifications.enabled
                  ? isDark
                    ? 'text-white/30'
                    : 'text-black/30'
                  : isDark
                    ? 'text-white/80'
                    : 'text-black/60'
              }`}
              accessibilityLabel={item.label}
            >
              {item.label}
            </Text>
            <Switch
              value={notifications[item.key]}
              onValueChange={(value) =>
                handleToggleIndividual(item.key, value)
              }
              disabled={!notifications.enabled}
              trackColor={{
                false: inactiveTrackColor,
                true: activeTrackColor,
              }}
              thumbColor={thumbColor}
              accessibilityLabel={`Toggle ${item.label}`}
            />
          </View>
        ))}
      </View>
    </SectionCard>
  );
};
