import Ionicons from '@expo/vector-icons/Ionicons';

import { router, useLocalSearchParams } from 'expo-router';

import { useEffect, useState } from 'react';

import { ActivityIndicator, Text, View } from 'react-native';

import { Container } from '@/components/general/container';

import { scanMenuImage } from '@/services/menu';

export default function ScanLoadingScreen() {
  const { imageUri } = useLocalSearchParams();

  const [loadingText, setLoadingText] = useState('Lendo seu cardápio...');

  useEffect(() => {
    const texts = [
      'Lendo seu cardápio...',
      'Identificando pratos...',
      'Analisando descrições...',
      'Organizando categorias...',
      'Finalizando leitura...',
    ];

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % texts.length;

      setLoadingText(texts[index]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const processMenu = async () => {
      try {
        const items = await scanMenuImage(String(imageUri));

        router.replace({
          pathname: '/(mybusiness)/menu/reviewScan',
          params: {
            items: JSON.stringify(items),
          },
        });
      } catch (error) {
        console.error(error);

        router.back();
      }
    };

    processMenu();
  }, []);

  return (
    <Container>
      <View
        className="
                    flex-1
                    items-center
                    justify-center
                    px-8
                "
      >
        <View
          className="
                        w-32 h-32
                        rounded-full
                        bg-primary/10
                        items-center
                        justify-center
                        mb-8
                    "
        >
          <Ionicons name="scan-outline" size={60} color="#C34342" />
        </View>

        <ActivityIndicator size="large" color="#C34342" />

        <Text
          className="
                        text-2xl
                        font-bold
                        text-dark
                        mt-8
                        text-center
                    "
        >
          {loadingText}
        </Text>

        <Text
          className="
                        text-center
                        text-black/60
                        mt-4
                        leading-6
                    "
        >
          Nossa inteligência artificial está lendo os itens do seu cardápio e
          organizando tudo para você.
        </Text>
      </View>
    </Container>
  );
}
