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
  onReplace: (newUri: string) => void;
  isLoading?: boolean;
};

export default function ImageItem({
  uri,
  onDelete,
  onReplace,
  isLoading = false,
}: Props) {
  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Você precisa permitir acesso à galeria.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      const newUri = result.assets[0].uri;

      onReplace(newUri);
    }
  }

  return (
    <View className="mb-4">
      <Image
        source={{ uri }}
        className="w-full h-52 rounded-2xl"
        resizeMode="cover"
      />

      <View className="flex-row gap-3 mt-2">
        <Pressable
          onPress={handlePickImage}
          disabled={isLoading}
          className="flex-1 bg-primary py-3 rounded-xl items-center justify-center"
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-light font-semibold">Substituir</Text>
          )}
        </Pressable>

        <Pressable
          onPress={onDelete}
          disabled={isLoading}
          className="flex-1 bg-black/15 py-3 rounded-xl items-center justify-center"
        >
          <Text className="text-primary font-semibold">Deletar</Text>
        </Pressable>
      </View>
    </View>
  );
}
