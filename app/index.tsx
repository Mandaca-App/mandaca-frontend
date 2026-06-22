import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import '../global.css';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to welcome screen
    router.replace('/welcome');
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold text-primary">Mandacá</Text>
    </View>
  );
}
