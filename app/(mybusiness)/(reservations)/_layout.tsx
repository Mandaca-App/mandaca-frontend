import { Stack } from 'expo-router';

export default function ReservationsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animationEnabled: true,
            }}
        >
            <Stack.Screen
                name="reservations"
                options={{
                    title: 'Reservas',
                }}
            />
            <Stack.Screen
                name="chat"
                options={{
                    title: 'Chat',
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
}
