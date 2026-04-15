import Ionicons from "@expo/vector-icons/Ionicons"
import { Pressable, Text } from "react-native"

type Props = {
    text: string
    handlePress: ()=> void
}

export const ChatButton = ({text, handlePress}: Props)=> {
    return(

        <Pressable
            className="px-6 py-4 mt-10 bg-primary rounded-xl flex-row justify-center items-center gap-3"
            onPress={handlePress}
            >
            <Text className="text-light text-lg font-semibold">{text}</Text>
            <Ionicons name="chatbox" size={24} color="#FFFFFF" />
        </Pressable>
    )
}