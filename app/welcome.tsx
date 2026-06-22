import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

export default function Welcome() {
  const router = useRouter();

  const handleTravelerPress = () => {
    Alert.alert(
      'Em Desenvolvimento',
      'A funcionalidade de Viajante ainda está em desenvolvimento.',
      [{ text: 'OK', onPress: () => {} }],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-8 py-10 justify-between">
        {/* Header Section */}
        <View className="items-center mt-12">
          <Text className="text-4xl font-bold text-primary mb-2">Mandacá</Text>
          <Text className="text-lg text-dark text-center">
            Conectando viajantes e empreendedores locais
          </Text>
        </View>

        {/* Illustration/Welcome Section */}
        <View className="items-center my-12">
          <View className="w-40 h-40 mb-8 rounded-2xl overflow-hidden">
            <Image
              source={require('@/assets/images/logo-mandaca-welcome.png')}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-2xl font-bold text-dark text-center mb-4">
            Bem-vindo ao Mandacá
          </Text>
          <Text className="text-base text-dark/70 text-center">
            Escolha seu perfil para começar a explorar experiências incríveis e
            desenvolver seu negócio.
          </Text>
        </View>

        {/* Choice Section */}
        <View className="gap-4 mb-8">
          {/* Traveler Card */}
          <Pressable
            onPress={handleTravelerPress}
            className="bg-light border-2 border-primary rounded-2xl p-6 flex-row items-center gap-4 active:opacity-70"
          >
            <View className="bg-primary/10 w-16 h-16 rounded-full items-center justify-center">
              <Ionicons name="airplane" size={32} color="#C34342" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-dark">Viajante</Text>
              <Text className="text-sm text-dark/70">
                Explore destinos e experiências únicas
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#C34342" />
          </Pressable>

          {/* Entrepreneur Card */}
          <Pressable
            onPress={() => router.push('/login')}
            className="bg-primary rounded-2xl p-6 flex-row items-center gap-4 active:opacity-80"
          >
            <View className="bg-light/20 w-16 h-16 rounded-full items-center justify-center">
              <Ionicons name="business" size={32} color="#FFFFFF" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-light">Empreendedor</Text>
              <Text className="text-sm text-light/80">
                Desenvolva seu negócio local
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Footer Text */}
        <Text className="text-center text-xs text-dark/50">
          Ao continuar, você concorda com nossos termos e condições
        </Text>
      </View>
    </SafeAreaView>
  );
}
