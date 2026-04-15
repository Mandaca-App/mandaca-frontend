import { Container } from "@/components/general/container";
import { Header } from "@/components/general/header";
import { View } from "react-native";

export default function Recomendations () {
    return(
        <Container>
            <View>
                <Header title="Recomendações" showBackButton showNotificationButton />
            </View>
        </Container>
    )
}