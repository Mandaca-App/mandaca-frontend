import Ionicons from "@expo/vector-icons/Ionicons"
import { Pressable, StyleSheet, Text } from "react-native"

type Props = {
    icon: any,
    title: string,
    description: string,
    route: ()=> void
}

export const GridBox = ({icon, title, description, route}: Props)=> {
    return(
        <Pressable 
            className="bg-light px-4 py-6 justify-center items-center rounded-2xl"
            style={style.cardShadow}
            onPress={route}
        >
            <Ionicons name={icon} size={30} color="#C34342" />
            <Text className="text-xl font-semibold text-center">
                {title}
            </Text>
            <Text className="text-lg font-semibold text-center">
                {description}
            </Text>
        </Pressable>
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