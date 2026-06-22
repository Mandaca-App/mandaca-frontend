import Ionicons from '@expo/vector-icons/Ionicons';

import * as ImagePicker from 'expo-image-picker';

import { router } from 'expo-router';

import { useState } from 'react';

import { Alert, Image, Pressable, Text, View } from 'react-native';

import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';

export default function ScanMenuScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Permita acesso à galeria.');

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Permita acesso à câmera.');

      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (!imageUri) {
      Alert.alert('Imagem necessária', 'Selecione ou fotografe um cardápio.');

      return;
    }

    router.navigate({
      pathname: '/(mybusiness)/menu/scanLoading',
      params: {
        imageUri,
      },
    });
  };

  return (
    <Container>
      <Header title="Escanear Cardápio" showBackButton />

      <View className="flex-1 mt-6">
        <View
          className="
                        items-center
                        mb-8
                    "
        >
          <View
            className="
                            w-24 h-24
                            rounded-full
                            bg-primary/10
                            items-center
                            justify-center
                            mb-4
                        "
          >
            <Ionicons name="scan-outline" size={42} color="#C34342" />
          </View>

          <Text
            className="
                            text-2xl
                            font-bold
                            text-dark
                            text-center
                        "
          >
            Escaneie seu cardápio
          </Text>

          <Text
            className="
                            text-center
                            text-black/60
                            mt-3
                            leading-6
                        "
          >
            Tire uma foto ou envie uma imagem do cardápio. Nossa IA identificará
            automaticamente os itens.
          </Text>
        </View>

        <Pressable
          onPress={handleGallery}
          className="
                        bg-light
                        border border-black/10
                        rounded-3xl
                        h-72
                        overflow-hidden
                        items-center
                        justify-center
                    "
        >
          {imageUri ? (
            <Image
              source={{
                uri: imageUri,
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="items-center gap-3">
              <Ionicons name="image-outline" size={48} color="#C34342" />

              <Text className="font-semibold text-primary">
                Selecionar imagem
              </Text>
            </View>
          )}
        </Pressable>

        <View className="mt-8 gap-4">
          <Pressable
            onPress={handleGallery}
            className="
                            bg-primary
                            rounded-2xl
                            py-4
                            flex-row
                            items-center
                            justify-center
                            gap-2
                        "
          >
            <Ionicons name="images-outline" size={22} color="#FFF" />

            <Text className="text-light font-bold">Escolher da galeria</Text>
          </Pressable>

          <Pressable
            onPress={handleCamera}
            className="
                            bg-light
                            border border-primary
                            rounded-2xl
                            py-4
                            flex-row
                            items-center
                            justify-center
                            gap-2
                        "
          >
            <Ionicons name="camera-outline" size={22} color="#C34342" />

            <Text className="text-primary font-bold">Tirar foto</Text>
          </Pressable>

          <Pressable
            onPress={handleContinue}
            className="
                            bg-primary
                            rounded-2xl
                            py-5
                            items-center
                        "
          >
            <Text className="text-light font-bold text-lg">Continuar</Text>
          </Pressable>
        </View>

        <View className="flex-1" />
      </View>
    </Container>
  );
}
