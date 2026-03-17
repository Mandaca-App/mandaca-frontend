import { View } from "react-native"
import { GridBox } from "./gridBox"

export const RouteGrid = ()=> {
    return(
        <View className="gap-4">
            <GridBox icon={"storefront"} title="Minha Empresa" description="Descrição e cadastro"/>
            <GridBox icon={"analytics-sharp"} title="Relatórios" description="Visão geral e Insights"/>
            <GridBox icon={"settings"} title="Configurações" description="Personalize o aplicativo"/>
            <GridBox icon={"hand-left"} title="Ajuda" description="Entre em contato conosco"/>
        </View>
    )
}