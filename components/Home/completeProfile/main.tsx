import { StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';

type Props = {
  prifileProgress: number;
};

export const CompleteProfile = ({ prifileProgress }: Props) => {
  const profileProgress = useSharedValue(prifileProgress);

  return (
    <View
      className="p-6 gap-4 bg-light rounded-3xl shadow"
      style={style.cardShadow}
    >
      <View className="flex-row justify-between">
        <Text className="font-bold text-2xl">Complete seu Perfil</Text>
        <Text className="font-semibold text-2xl text-primary">75%</Text>
      </View>

      <Text className="text-lg">
        Preencha as informações para atrair mais turistas
      </Text>

      <View className="w-full h-2 bg-black/10 rounded-full">
        <Animated.View
          className="h-full bg-primary rounded-full"
          style={{ width: profileProgress }}
        ></Animated.View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.8,

    elevation: 5,
  },
});
