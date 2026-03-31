import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { OverviewCard } from '@/components/MyBusiness/overviewCard/main';
import { AccessGrid } from '@/components/MyBusiness/accessGrid/main';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function MyBusiness() {
    // requisição para buscar dados do backend: 
    // imagem e notificações (menu, reservations, reviews, schedule)

    return (
        <Container>
            <Header title="Minha Empresa" showBackButton showNotificationButton />
            <View className="gap-6">
                <OverviewCard
                    imageUrl={undefined}
                    onPress={() => router.navigate('/businessOverview')}
                />
                <AccessGrid notifications={{
                    menu: false,
                    reservations: true,
                    reviews: true,
                    schedule: false,
                }} />
            </View>
        </Container>
    );
}