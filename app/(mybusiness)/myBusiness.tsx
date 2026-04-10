import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { AccessGrid } from '@/components/MyBusiness/accessGrid/main';
import { OverviewCard } from '@/components/MyBusiness/overviewCard/main';
import { EnterpriseOverview } from '@/types/enterprise';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

export default function MyBusiness() {
  const [enterprise, setEnterprise] = useState<EnterpriseOverview | null>(null);
  const [loading, setLoading] = useState(true);

  const getEnterpriseOverview = async () => {
    try {
      const enterpriseId = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';
      const url = `https://mandaca-backend.onrender.com/enterprises/overview?enterprise_id=${enterpriseId}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data && data.id_empresa) {
        setEnterprise(data);
      }
    } catch (error) {
      console.error('Erro ao buscar empresa:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnterpriseOverview();
  }, []);

  const firstImageUrl = enterprise?.fotos?.[0]?.url_foto_empresa;

  return (
    <Container>
      <Header title="Minha Empresa" showBackButton showNotificationButton />
      <View className="gap-6">
        <OverviewCard
          imageUrl={firstImageUrl}
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
