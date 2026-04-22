import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export default function Report() {
  const handleConsultorPress = () => {
    router.push('/consultant');
  };

  return (
    <Container>
      <Header
        title="Seus Relatórios"
        showBackButton={true}
        showNotificationButton={true}
        rightButtonIcon="chatbox-outline"
        rightButtonColor="#FFFFFF"
        rightButtonBgColor="#C34342"
        onNotificationPress={handleConsultorPress}
      />
      <View className="mt-6">
        <Text className="text-lg">Conteúdo dos Relatórios</Text>
        {/* Implementar conteúdo de relatórios */}
      </View>
    </Container>
  );
}
