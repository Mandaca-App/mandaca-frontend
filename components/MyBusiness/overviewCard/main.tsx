import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    imageUrl?: string,
    onPress?: () => void
}

export const OverviewCard = ({ imageUrl, onPress }: Props) => {
    // requisição para receber imagem do estabelecimento

    return (
        <Pressable
            className="p-4 bg-light rounded-3xl flex-row gap-6"
            style={style.cardShadow}
            onPress={onPress}
        >
            {/* Imagem */}
            {imageUrl ? (
                <Image
                    source={{ uri: imageUrl }}
                    className="w-[121px] h-[121px] rounded-[10px]"
                />
            ) : (
                <View className="w-[121px] h-[121px] rounded-[10px] bg-gray-100 
                justify-center items-center">
                    <Ionicons name="image-outline" size={40} color="#ccc" />
                    <Text className="text-xs text-gray-400 text-center mt-2">
                        Sem imagem
                    </Text>
                </View>
            )}

            {/* Conteúdo textos */}
            <View className="flex-1 justify-center gap-5">
                <View className="justify-center items-center">
                    <Text className="text-base font-bold leading-6 text-center">
                        Visão geral
                    </Text>
                </View>
                <Text className="text-xs font-semibold px-5 text-center">
                    Personalize o jeito como o seu restaurante é visto; história, endereço, fotos
                </Text>
            </View>
        </Pressable>
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
