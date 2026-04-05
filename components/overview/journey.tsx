import { StyleSheet, Text, View } from 'react-native';
import Carousel from './carousel';

type Props = {
  story: string;
};

export default function Journey({ story }: Props) {
  return (
    <View
      style={style.cardShadow}
      className="bg-light rounded-xl items-center justify-center p-4 gap-8"
    >
      <Text className="text-lg font-semibold">Nossa jornada gastronômica</Text>
      <Carousel/>
      <Text>{story}</Text>
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
