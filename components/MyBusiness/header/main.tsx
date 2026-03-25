import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from "react-native";

export const MyBusinessHeader = () => {
    return (
        <View className="flex flex-row justify-between items-center">
            <Pressable
                className="h-10 w-10 bg-light rounded-full justify-center items-center"
                style={style.cardShadow}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
            </Pressable>

            <Text className="text-lg font-semibold">
                Minha Empresa
            </Text>

            <Pressable
                className="h-10 w-10 bg-light rounded-full justify-center items-center"
                style={style.cardShadow}
                onPress={() => router.navigate("/notifications")}
            >
                <Ionicons name="notifications" size={24} color="#2C2C2C" />
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.80,
        elevation: 5,
    }
})
