import Ionicons from '@expo/vector-icons/Ionicons';

import * as ImagePicker from 'expo-image-picker';

import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    Text,
    View,
} from 'react-native';

type Props = {
    id: string;
    uri: string;
    onDelete: () => void;
    onReplace: (
        newUri: string,
    ) => void;
    isLoading?: boolean;
};

export default function ImageItem({
    uri,
    onDelete,
    onReplace,
    isLoading = false,
}: Props) {
    async function handlePickImage() {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (
            !permission.granted
        ) {
            Alert.alert(
                'Permissão necessária',
                'Você precisa permitir acesso à galeria.',
            );

            return;
        }

        const result =
            await ImagePicker.launchImageLibraryAsync(
                {
                    mediaTypes: [
                        'images',
                    ],
                    quality: 1,
                },
            );

        if (
            !result.canceled
        ) {
            const newUri =
                result.assets[0]
                    .uri;

            onReplace(newUri);
        }
    }

    return (
        <View
            className="
                bg-light border border-black/5
                rounded-[28px]
                overflow-hidden
                mb-5
            "
        >
            <View className="relative">
                <Image
                    source={{
                        uri,
                    }}
                    className="w-full h-60"
                    resizeMode="cover"
                />
            </View>

            <View className="p-5 gap-5">
                <View className="gap-1">
                    <Text className="text-xl font-bold text-dark">
                        Gerenciar imagem
                    </Text>

                    <Text className="text-sm text-black/50 leading-5">
                        Atualize ou remova a imagem exibida
                        no perfil do restaurante.
                    </Text>
                </View>

                <View className="flex-row gap-3">
                    <Pressable
                        onPress={
                            handlePickImage
                        }
                        disabled={
                            isLoading
                        }
                        className="
                            flex-1 bg-primary
                            rounded-2xl
                            py-4 px-4
                            flex-row items-center justify-center gap-2
                        "
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <>
                                <Ionicons
                                    name="create-outline"
                                    size={
                                        20
                                    }
                                    color="#FFFFFF"
                                />

                                <Text className="text-light font-bold">
                                    Substituir
                                </Text>
                            </>
                        )}
                    </Pressable>

                    <Pressable
                        onPress={
                            onDelete
                        }
                        disabled={
                            isLoading
                        }
                        className="
                            flex-1 bg-rose-50
                            border border-rose-200
                            rounded-2xl
                            py-4 px-4
                            flex-row items-center justify-center gap-2
                        "
                    >
                        <Ionicons
                            name="trash-outline"
                            size={20}
                            color="#DC2626"
                        />

                        <Text className="text-red-600 font-bold">
                            Remover
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}