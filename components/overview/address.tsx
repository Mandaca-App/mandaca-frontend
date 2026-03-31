import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  address: string;
};

export default function Address({ address }: Props) {
  const handleMapsbutton = () => {};
  return (
    <View
      style={style.cardShadow}
      className="bg-light rounded-xl items-center justify-center p-4 gap-8"
    >
      <Text className="font-bold text-lg">Endereço</Text>
      <Text>{address}</Text>
      <Pressable
        onPress={handleMapsbutton}
        className="bg-primary flex-row w-full py-4 items-center justify-center rounded-xl"
      >
        <Text className="text-secondary font-bold">Abrir no maps</Text>
        <Ionicons name="location" size={30} color="#FFF" />
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.8,

    elevation: 2,
  },
});
