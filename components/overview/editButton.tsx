import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function EditButton() {
  return (
    <View style={style.cardShadow} className="w-full p-6 rounded-xl bg-light">
      <Pressable
        onPress={()=> router.navigate('/(mybusiness)/editStory')}
        className="flex-row justify-between items-center"
      >
        <Ionicons name="brush" size={30} color="#C34342" />
        <View>
          <Text className="text-xl font-semibold">Editar</Text>
          <Text>Atualize sua jornada, fotos e endereço</Text>
        </View>
        <Ionicons name="arrow-forward" size={25} color="#2C2C2C" />
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
