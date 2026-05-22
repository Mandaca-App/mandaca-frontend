import Ionicons from '@expo/vector-icons/Ionicons';

import {
    Image,
    Pressable,
    Text,
    View,
} from 'react-native';

type Props = {
    imageUrl?: string;
    onPress?: () => void;
};

export const OverviewCard = ({
    imageUrl,
    onPress,
}: Props) => {
    return (
        <Pressable
            className="
                bg-light border border-black/5
                rounded-[32px] overflow-hidden
            "
            onPress={onPress}
        >
            {imageUrl ? (
                <Image
                    source={{ uri: imageUrl }}
                    className="w-full h-56"
                    resizeMode="cover"
                />
            ) : (
                <View
                    className="
                        w-full h-56
                        bg-primary/5
                        items-center justify-center
                        gap-4
                    "
                >
                    <View
                        className="
                            w-20 h-20 rounded-3xl
                            bg-primary/10
                            items-center justify-center
                        "
                    >
                        <Ionicons
                            name="image-outline"
                            size={42}
                            color="#C34342"
                        />
                    </View>

                    <Text className="text-primary font-bold text-base">
                        Nenhuma imagem adicionada
                    </Text>
                </View>
            )}

            <View className="p-6 gap-6">
                <View className="gap-4">
                    <View className="flex-row items-center justify-between">
                        <View className="gap-2 flex-1">
                            <View className="flex-row items-center gap-2">
                                <View className="w-2 h-2 rounded-full bg-primary" />

                                <Text className="text-2xl font-bold text-dark">
                                    Visão geral
                                </Text>
                            </View>

                            <Text className="text-base text-black/60 leading-6">
                                Personalize a forma como os turistas enxergam seu restaurante.
                            </Text>
                        </View>

                        <View
                            className="
                                w-14 h-14 rounded-2xl
                                bg-primary/10
                                items-center justify-center
                            "
                        >
                            <Ionicons
                                name="storefront-outline"
                                size={28}
                                color="#C34342"
                            />
                        </View>
                    </View>

                    <View className="flex-row flex-wrap gap-2">
                        <View className="bg-primary/10 px-3 py-2 rounded-full">
                            <Text className="text-primary text-xs font-semibold">
                                História
                            </Text>
                        </View>

                        <View className="bg-primary/10 px-3 py-2 rounded-full">
                            <Text className="text-primary text-xs font-semibold">
                                Fotos
                            </Text>
                        </View>

                        <View className="bg-primary/10 px-3 py-2 rounded-full">
                            <Text className="text-primary text-xs font-semibold">
                                Endereço
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    className="
                        bg-primary rounded-2xl
                        px-5 py-4
                        flex-row items-center justify-between
                    "
                >
                    <View className="flex-row items-center gap-3">
                        <Text className="text-light font-bold text-base">
                            Gerenciar perfil
                        </Text>
                    </View>

                    <Ionicons
                        name="arrow-forward"
                        size={20}
                        color="#FFFFFF"
                    />
                </View>
            </View>
        </Pressable>
    );
};