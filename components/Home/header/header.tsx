import { API_URL } from '@/constants/api';
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

      const responseUser = await axios.get(`${API_URL}/users/${userId}`);

      setUser(responseUser.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <View className="mt-8">
        <ActivityIndicator color={'#C34342'} />
      </View>
    );
  }

  const userName = user?.nome || 'Usuário';
  const formattedUserName =
    userName.length > 20 ? `${userName.slice(0, 20)}...` : userName;

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <View className="flex flex-row justify-between items-center bg-primary/95 pt-20 pb-10 px-8 rounded-b-[12vw]">
      <Pressable
        className="h-12 w-12 bg-dark rounded-full justify-center items-center overflow-hidden"
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
        <Text className="text-lg text-light">Bem-vindo de volta 👋</Text>

        <Text className="font-semibold text-center text-2xl text-light">
          {formattedUserName}
        </Text>
      </View>

      <Pressable
        className="h-12 w-12 bg-light rounded-full justify-center items-center"
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
