import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';

type topic = {
  id: number;
  text: string;
};
type Props = {
  icon: any;
  typeCard: 'positive' | 'negative' | 'recomendation';
  topics: topic[];
  handlePress: () => void;
};

export const CardItem = ({ icon, typeCard, topics, handlePress }: Props) => {
  return (
    <View className="px-10 py-8 border border-primary rounded-2xl justify-center gap-6">
      <View className="flex-row items-center justify-between">
        <Ionicons name={icon} size={28} color="#C34342" />
        {typeCard === 'positive' && (
          <>
            <Text className="text-xl text-primary font-semibold">
              Pontos positivos
            </Text>
            <View className="w-5 h-5 rounded-full bg-emerald-500"></View>
          </>
        )}
        {typeCard === 'negative' && (
          <>
            <Text className="text-xl text-primary font-semibold">
              Pontos negativos
            </Text>
            <View className="w-5 h-5 rounded-full bg-rose-600"></View>
          </>
        )}
        {typeCard === 'recomendation' && (
          <>
            <Text className="text-xl text-primary font-semibold">
              Recomendações
            </Text>
            <View className="w-5 h-5 rounded-full bg-cyan-400"></View>
          </>
        )}
      </View>

      {topics.map((item) => (
        <View
          key={item.id}
          className="flex-row items-center justify-start gap-4 mb-1"
        >
          <View className="w-4 h-1 rounded-full bg-primary"></View>
          <Text className="font-semibold px-2">{item.text}</Text>
        </View>
      ))}
      <Pressable
        className="flex-row items-center bg-primary justify-center rounded-xl py-3 gap-3"
        onPress={handlePress}
      >
        <Text className="text-light font-semibold">Ver Sugestões</Text>
        <Ionicons name={'arrow-forward'} size={20} color="#FFFFFF" />
      </Pressable>
    </View>
  );
};
