import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import ImagesList from '@/components/manageImages/imagesList';
import { View } from 'react-native';

export default function ManageImages() {
  return (
    <Container>
      <View className="gap-6">
        <Header title="Editar Imagens" showBackButton showNotificationButton />
        <ImagesList />
      </View>
    </Container>
  );
}
