import { useColorScheme, ScrollView, View } from 'react-native';
import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { PasswordSection } from '@/components/Settings/PasswordSection';
import { NotificationsSection } from '@/components/Settings/NotificationsSection';
import { AppearanceSection } from '@/components/Settings/AppearanceSection';
import { useSettings } from '@/contexts/SettingsContext';

export default function Settings() {
  const { settings } = useSettings();
  const systemScheme = useColorScheme();

  // Aplica tema escuro apenas nesta tela
  // TODO: Estender suporte a tema escuro para as demais telas do app
  const isDark =
    settings.theme === 'dark' ||
    (settings.theme === 'auto' && systemScheme === 'dark');

  return (
    <View className={`flex-1 ${isDark ? 'bg-[#121212]' : 'bg-background'}`}>
      <Container>
        <Header
          title="Configurações"
          showBackButton
          showNotificationButton={false}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="gap-6 mt-2">
            <PasswordSection isDark={isDark} />
            <NotificationsSection isDark={isDark} />
            <AppearanceSection isDark={isDark} />
          </View>
        </ScrollView>
      </Container>
    </View>
  );
}
