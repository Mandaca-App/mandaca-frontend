import Ionicons from '@expo/vector-icons/Ionicons';

import { router } from 'expo-router';

import {
    Pressable,
    Text,
    View,
} from 'react-native';

export default function EditButton() {
    return (
        <Pressable
            onPress={() =>
                router.navigate(
                    '/(mybusiness)/editStory',
                )
            }
            className="
                bg-primary
                rounded-3xl
                px-6 py-5
                flex-row items-center justify-between
            "
        >
            <View className="flex-row items-center gap-4 flex-1">
                <View
                    className="
                        w-14 h-14 rounded-2xl
                        bg-white/15
                        items-center justify-center
                    "
                >
                    <Ionicons
                        name="brush"
                        size={26}
                        color="#FFFFFF"
                    />
                </View>

                <View className="flex-1">
                    <Text className="text-light text-xl font-bold">
                        Editar perfil
                    </Text>

                    <Text className="text-light/80 text-sm mt-1 leading-5">
                        Atualize fotos, endereço e história
                        do restaurante
                    </Text>
                </View>
            </View>

            <Ionicons
                name="arrow-forward"
                size={24}
                color="#FFFFFF"
            />
        </Pressable>
    );
}