import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { uploadImage } from '@/services/imagesEnterprise';

type Props = {
  onUploadSuccess?: () => void;
};

type Status = 'idle' | 'loading' | 'success';

export default function FileUpload({ onUploadSuccess }: Props) {
  const [status, setStatus] = useState<Status>('idle');

  const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

  const pickImage = async () => {
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
      const uri = result.assets[0].uri;

      setStatus('loading');

      try {
        await uploadImage(uri, ENTERPRISE_ID);

        setStatus('success');

        onUploadSuccess?.();

        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      } catch (error) {
        console.error('Erro ao fazer upload:', error);
        setStatus('idle');
      }
    }
  };

  return (
    <Pressable onPress={pickImage}>
      <Text className="font-semibold text-lg mb-4">Adicionar Imagem</Text>

      <View className="w-full h-60 gap-4 mb-4 rounded-xl border border-dark/15 justify-center items-center overflow-hidden">
        {status === 'loading' && <Text>Enviando...</Text>}

        {status === 'success' && (
          <>
            <Ionicons name="checkmark-circle" size={48} color="#22C55E" />
            <Text className="text-green-500 text-xl font-semibold">
              Imagem Adicionada
            </Text>
          </>
        )}

        {status === 'idle' && (
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
