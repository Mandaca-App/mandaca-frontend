import { router } from 'expo-router';
import { View } from 'react-native';
import { AccessCard } from './accessCard';

type AccessGridProps = {
    notifications?: {
        menu?: boolean
        reservations?: boolean
        reviews?: boolean
        schedule?: boolean
    }
}

export const AccessGrid = ({ notifications = {} }: AccessGridProps) => {
    return (
        <View className="gap-6 w-full">
            <AccessCard
                icon="book"
                title="Cardápio"
                hasNotification={notifications.menu}
                onPress={() => router.navigate('/menu')}
            />

            <AccessCard
                icon="calendar"
                title="Reservas"
                hasNotification={notifications.reservations}
                onPress={() => router.navigate('/reservations')}
            />

            <AccessCard
                icon="heart"
                title="Avaliações"
                hasNotification={notifications.reviews}
                onPress={() => router.navigate('/reviews')}
            />

            <AccessCard
                icon="time"
                title="Horários"
                hasNotification={notifications.schedule}
                onPress={() => router.navigate('/schedule')}
            />
        </View>
    );
};
