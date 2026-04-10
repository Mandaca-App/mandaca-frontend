import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Component } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

type State = {
    image: string | null;
};

export default class FileUpload extends Component<{}, State> {
    state: State = {
        image: null,
    };

    pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert('Permissão para acessar a galeria é necessária!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        });

        if (!result.canceled) {
            this.setState({ image: result.assets[0].uri });
        }
    };

    render() {
        const { image } = this.state;

        return (
            <Pressable onPress={this.pickImage}>
                <Text className="font-semibold text-lg mb-4">
                    Imagens ou mídias
                </Text>

                <View className="w-full h-60 gap-4 rounded-xl border border-dark/15 justify-center items-center overflow-hidden">
                    
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <>
                            <Ionicons name="images-outline" size={40} color="#2C2C2C" />
                            <Text className="text-primary text-xl font-semibold">
                                Adicionar Imagem
                            </Text>
                        </>
                    )}

                </View>
            </Pressable>
        );
    }
}