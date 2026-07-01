import React, { useState } from 'react';
import { View, Text, Pressable, Image, ScrollView, Alert } from 'react-native';
import { Container } from '@/components/general/container';
import { Header } from '@/components/general/header';
import { useUser } from '@/contexts/UserContext';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AccountSection } from '@/components/Settings/AccountSection';
import { GridBox } from '@/components/Home/routeGrid/gridBox';
import { router } from 'expo-router';
import { LogoutButton } from '@/components/Settings/LogoutButton';

export default function Profile() {
  const { user, updatePhoto, isLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permissão negada', 'Precisamos de permissão para acessar suas fotos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        await updatePhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao escolher imagem', error);
      Alert.alert('Erro', 'Não foi possível alterar a foto.');
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Text>Carregando...</Text>
      </View>
    );
  }

  const userName = user?.nome || 'Usuário';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <View className="flex-1 bg-background">
      <Container>
        <Header title="Perfil" showBackButton showNotificationButton={false} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          
          {/* Avatar e Cabeçalho do Perfil */}
          <View className="items-center mt-6 mb-8">
            <View className="relative">
              <View className="h-28 w-28 bg-dark rounded-full justify-center items-center overflow-hidden mb-4 shadow-sm shadow-black">
                {user?.url_foto_usuario ? (
                  <Image source={{ uri: user.url_foto_usuario }} className="w-full h-full" />
                ) : (
                  <Text className="text-light text-5xl font-bold">{userInitial}</Text>
                )}
              </View>
              <Pressable
                onPress={handlePickImage}
                className="absolute bottom-4 right-0 bg-primary h-10 w-10 rounded-full justify-center items-center border-4 border-background"
                accessibilityLabel="Trocar foto de perfil"
              >
                <Ionicons name="camera" size={20} color="#FFFFFF" />
              </Pressable>
            </View>

            <Text className="text-2xl font-bold text-dark">{userName}</Text>
            <View className="bg-primary/10 px-3 py-1 rounded-full mt-2">
              <Text className="text-primary font-semibold text-sm">Conta MEI</Text>
            </View>
          </View>

          {/* Dados de Contato */}
          <View className="bg-white rounded-3xl p-5 mb-6 shadow-sm shadow-black/5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-dark">Dados Pessoais</Text>
              <Pressable onPress={() => setIsEditing(!isEditing)}>
                <Text className="text-primary font-bold">
                  {isEditing ? 'Cancelar' : 'Editar dados'}
                </Text>
              </Pressable>
            </View>

            {isEditing ? (
              // Modo de edição: Reaproveita o formulário de Configurações > Conta
              <View className="-mx-5 -mb-5">
                <AccountSection isDark={false} />
              </View>
            ) : (
              // Modo de visualização (somente leitura)
              <View className="gap-4">
                <View>
                  <Text className="text-dark/60 text-sm mb-1">E-mail</Text>
                  <Text className="text-dark font-medium text-base">
                    {user?.email || 'Nenhum e-mail cadastrado'}
                  </Text>
                </View>
                <View>
                  <Text className="text-dark/60 text-sm mb-1">Telefone</Text>
                  <Text className="text-dark font-medium text-base">
                    {user?.telefone || 'Nenhum telefone cadastrado'}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Atalhos de navegação */}
          <View className="mb-6 gap-4">
            <Text className="text-lg font-bold text-dark mb-2 px-1">Atalhos</Text>
            <GridBox
              icon="business"
              title="Minha Empresa"
              description="Edite informações e acompanhe seu negócio."
              route={() => router.push('/myBusiness')}
              variant="highlight"
            />
            <View className="flex-row gap-4">
              <View className="flex-1">
                <GridBox
                  icon="settings"
                  title="Configurações"
                  description="Preferências"
                  route={() => router.push('/settings')}
                />
              </View>
              <View className="flex-1">
                <GridBox
                  icon="help-circle"
                  title="Ajuda"
                  description="Central de suporte"
                  route={() => router.push('/help')}
                />
              </View>
            </View>
          </View>

          {/* Sair da Conta */}
          <View className="mt-4">
            <LogoutButton />
          </View>

        </ScrollView>
      </Container>
    </View>
  );
}
