import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
    title: string;
    showBackButton?: boolean;
    showNotificationButton?: boolean;
    onBackPress?: () => void;
    onNotificationPress?: () => void;
}

export const Header = ({
    title,
    showBackButton = false,
    showNotificationButton = true,
    onBackPress,
    onNotificationPress,
}: Props) => {

    const handleBack = onBackPress ? onBackPress : () => router.back();
    const handleNotification = onNotificationPress ? onNotificationPress :
        () => router.navigate('/notifications');

    return (
        <View className="flex flex-row justify-between items-center">
            {showBackButton ? (
                <Pressable
                    className="h-10 w-10 bg-light rounded-full justify-center items-center"
                    style={style.cardShadow}
                    onPress={handleBack}
                >
                    <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
                </Pressable>
            ) : (
                <View className="h-10 w-10" />
            )}

            <Text className="text-lg font-semibold flex-1 text-center">
                {title}
            </Text>

            {showNotificationButton ? (
                <Pressable
                    className="h-10 w-10 bg-light rounded-full justify-center items-center"
                    style={style.cardShadow}
                    onPress={handleNotification}
                >
                    <Ionicons name="notifications" size={24} color="#2C2C2C" />
                </Pressable>
            ) : (
                <View className="h-10 w-10" />
            )}
        </View>
    );
};

const style = StyleSheet.create({
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.80,
        elevation: 5,
    },
});
