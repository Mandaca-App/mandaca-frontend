import Ionicons from '@expo/vector-icons/Ionicons';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

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
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      await Linking.openURL(url);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível abrir o mapa.');
    }
  };

  return (
    <View
      style={style.cardShadow}
      className="bg-light rounded-xl items-center justify-center p-4 gap-8"
    >
      <Text className="font-bold text-lg">Endereço</Text>
      <Text className="text-center">{address || 'Endereço não informado'}</Text>

      <Pressable
        onPress={handleMapsbutton}
        className="bg-primary flex-row w-full py-4 items-center justify-center rounded-xl gap-2"
      >
        <Text className="text-secondary font-bold">Abrir no maps</Text>
        <Ionicons name="location" size={24} color="#FFF" />
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.8,
    elevation: 2,
  },
});