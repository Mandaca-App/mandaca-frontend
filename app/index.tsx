import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import '../global.css';

export default function App() {
  const router = useRouter(); // ✅ correto

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">Hello Mandacá!</Text>

      <Pressable
        className="px-8 py-4 bg-primary rounded-lg"
        onPress={() => router.push('/home')} // ✅ usar push
      >
        <Text className="text-secondary font-semibold">ir para Home</Text>
      </Pressable>
    </View>
  );
}
