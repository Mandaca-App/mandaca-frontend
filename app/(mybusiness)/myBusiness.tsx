import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';

import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { AccessGrid } from '@/components/MyBusiness/accessGrid/main';
import { OverviewCard } from '@/components/MyBusiness/overviewCard/main';

import { getImagesByEnterprise } from '@/services/imagesEnterprise';
import { ImageEnterprise } from '@/types/imageEnterprise';

const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

export default function MyBusiness() {
  const [image, setImage] = useState<string | undefined>(undefined);

  const loadImages = useCallback(async () => {
    try {
      const data: ImageEnterprise[] =
        await getImagesByEnterprise(ENTERPRISE_ID);

      if (data.length > 0) {
        setImage(data[0].url_foto_empresa);
      }
    } catch (error) {
      console.error('Erro ao carregar imagem:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadImages();
    }, [loadImages]),
  );

  return (
    <Container>
      <Header title="Minha Empresa" showBackButton showNotificationButton />

      <View className="gap-6">
        <OverviewCard
          imageUrl={image}
          onPress={() => router.navigate('/businessOverview')}
        />

        <AccessGrid
          notifications={{
            menu: false,
            reservations: true,
            reviews: true,
            schedule: false,
          }}
        />
      </View>
    </Container>
  );
}
