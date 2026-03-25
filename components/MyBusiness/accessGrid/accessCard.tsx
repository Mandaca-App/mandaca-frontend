import Ionicons from "@expo/vector-icons/Ionicons"
import { Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
    icon: any,
    title: string,
    hasNotification?: boolean,
    onPress: () => void
}

export const AccessCard = ({ icon, title, hasNotification = false, onPress }: Props) => {
    return (
        <Pressable
            className="bg-light rounded-2xl w-full flex-row h-20 relative"
            style={style.cardShadow}
            onPress={onPress}
        >
            {/* Ícone */}
            <View className="absolute left-8 h-full justify-center">
                <Ionicons name={icon} size={40} color="#C34342" />
            </View>

            {/* Slot esquerdo para manter centralização do título */}
            <View style={style.sideSlot} />

            {/* Título */}
            <View className="flex-1 justify-center items-center">
                <Text className="text-xl font-medium text-center" style={{ lineHeight: 26 }}>
                    {title}
                </Text>
            </View>

            {/* Notificação */}
            {hasNotification ? (
                <View style={style.sideSlot} className="justify-center items-center right-3">
                    <Ionicons name="information-circle" size={32} color="#C34342" />
                </View>
            ) : (
                <View style={style.sideSlot} />
            )}
        </Pressable>
    )
}

const style = StyleSheet.create({
    sideSlot: {
        width: 44,
    },
    cardShadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.80,
        elevation: 5,
    }
})
