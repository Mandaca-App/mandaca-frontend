import { User } from '@/types/user';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = async () => {
    try {
      const userId = '453df15b-61ce-4571-8bdb-cdbedf0ff041';

      const responseUser = await axios.get(
        `https://mandaca-backend.onrender.com/users/${userId}`,
      );

      setUser(responseUser.data);
    } catch {
      // Error silently handled
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <ActivityIndicator color={'#C34342'} />;
  }

  const userName = user?.nome || 'Usuário';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <View className="flex flex-row justify-between">
      <Pressable
        className="h-10 w-10 bg-dark rounded-full justify-center items-center overflow-hidden"
        style={style.cardShadow}
        onPress={() => router.push('/profile')}
      >
        {user?.url_foto_usuario ? (
          <Image
            source={{ uri: user.url_foto_usuario }}
            className="w-full h-full"
          />
        ) : (
          <Text className="text-light text-xl">{userInitial}</Text>
        )}
      </Pressable>

      <View className="flex-col">
        <Text className="text-lg text-center">Bem-vindo de volta,</Text>
        <Text className="font-semibold text-center text-lg">{userName}</Text>
      </View>

      <Pressable
        className="h-10 w-10 bg-light rounded-full justify-center items-center"
        style={style.cardShadow}
        onPress={() => router.push('/notifications')}
      >
        <Ionicons name="notifications" size={24} color="#2C2C2C" />
      </Pressable>
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
