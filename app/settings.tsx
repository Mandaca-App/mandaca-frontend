import { useColorScheme, View } from 'react-native';
import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { AccountSection } from '@/components/Settings/AccountSection';
import { PasswordSection } from '@/components/Settings/PasswordSection';
import { NotificationsSection } from '@/components/Settings/NotificationsSection';
import { AppearanceSection } from '@/components/Settings/AppearanceSection';
import { LogoutButton } from '@/components/Settings/LogoutButton';
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

        <View className="gap-6">
          <AccountSection isDark={isDark} />
          <PasswordSection isDark={isDark} />
          <NotificationsSection isDark={isDark} />
          <AppearanceSection isDark={isDark} />
          <LogoutButton isDark={isDark} />
        </View>
      </Container>
    </View>
  );
}
