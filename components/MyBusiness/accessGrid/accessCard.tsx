import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ComponentProps } from 'react';

type Props = {
    icon: ComponentProps<typeof Ionicons>['name'],
    title: string,
    hasNotification?: boolean,
    onPress: () => void
}

export const AccessCard = ({ icon, title, hasNotification = false, onPress }: Props) => {
    return (
        <Pressable
            className="bg-light rounded-2xl w-full flex-row h-20 items-center px-6 gap-4"
            style={style.cardShadow}
            onPress={onPress}
        >
            {/* Ícone */}
            <View className="flex-shrink-0">
                <Ionicons name={icon} size={40} color="#C34342" />
            </View>

            {/* Título - ocupa espaço disponível */}
            <View className="flex-1 justify-center items-center">
                <Text className="text-xl font-medium text-center" style={{ lineHeight: 26 }}>
                    {title}
                </Text>
            </View>

            {/* Notificação */}
            <View className="flex-shrink-0">
                {hasNotification ? (
                    <Ionicons name="information-circle" size={32} color="#C34342" />
                ) : null}
            </View>
        </Pressable>
    );
};

const style = StyleSheet.create({
    cardShadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.80,
        elevation: 5,
    },
});
