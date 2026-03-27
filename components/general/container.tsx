import React from "react"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type Props = {
    children: React.ReactNode
}

export const Container = ({children}: Props)=> {
    return(
        <SafeAreaView>
            <ScrollView>
                <View className="px-8 py-5 gap-12">
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}