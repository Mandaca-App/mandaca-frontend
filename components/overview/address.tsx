import Ionicons from '@expo/vector-icons/Ionicons';

import { Alert, Linking, Pressable, Text, View } from 'react-native';

type Props = {
  address: string;
};

export default function Address({ address }: Props) {
  const handleMapsbutton = async () => {
    if (!address) {
      Alert.alert('Erro', 'Endereço não disponível.');

      return;
    }

    try {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address,
      )}`;

      await Linking.openURL(url);
    } catch (error) {
      console.error(error);

      Alert.alert('Erro', 'Não foi possível abrir o mapa.');
    }
  };

  return (
    <View
      className="
                bg-light border border-black/5
                rounded-[32px]
                overflow-hidden
            "
    >
      <View className="px-6 py-7 gap-6">
        <View className="flex-row items-center gap-4">
          <View
            className="
                            w-16 h-16 rounded-2xl
                            bg-primary/10
                            items-center justify-center
                        "
          >
            <Ionicons name="location" size={30} color="#C34342" />
          </View>

          <View className="flex-1 gap-1">
            <Text className="text-2xl font-bold text-dark">Localização</Text>

            <Text className="text-sm text-black/50">
              Veja onde seu restaurante está localizado
            </Text>
          </View>
        </View>

        <View
          className="
                        bg-primary/5
                        border border-primary/10
                        rounded-3xl
                        px-5 py-5
                        gap-4
                    "
        >
          <View className="flex-row items-start gap-3">
            <View
              className="
                                w-10 h-10 rounded-xl
                                bg-primary/10
                                items-center justify-center
                            "
            >
              <Ionicons name="navigate" size={18} color="#C34342" />
            </View>

            <View className="flex-1">
              <Text className="text-xs font-semibold text-primary uppercase tracking-wider">
                Endereço
              </Text>

              <Text className="text-base leading-6 text-black/70 mt-2">
                {address || 'Endereço não informado'}
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleMapsbutton}
          className="
                        bg-primary
                        rounded-2xl
                        px-5 py-5
                        flex-row items-center justify-between
                    "
        >
          <View className="flex-row items-center gap-3">
            <View
              className="
                                w-11 h-11 rounded-xl
                                bg-white/15
                                items-center justify-center
                            "
            >
              <Ionicons name="map" size={22} color="#FFFFFF" />
            </View>

            <View>
              <Text className="text-light font-bold text-base">
                Abrir no Maps
              </Text>

              <Text className="text-light/70 text-xs mt-1">
                Traçar rota até o restaurante
              </Text>
            </View>
          </View>

          <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}
