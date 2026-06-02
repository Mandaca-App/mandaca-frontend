// components/enterprise/carousel.tsx

import { getImagesByEnterprise } from '@/services/imagesEnterprise';

import { ImageEnterprise } from '@/types/imageEnterprise';

import { useFocusEffect } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';

import React, { useCallback, useState } from 'react';

import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ImageSkeleton } from './imageSkeleton';

const { width } = Dimensions.get('window');

const DOT_ACTIVE_COLOR = '#C34342';

const DOT_INACTIVE_COLOR = '#E5E5E5';

interface PaginationDotProps {
  active: boolean;
}

const PaginationDot = ({ active }: PaginationDotProps) => {
  const animationProgress = useSharedValue(active ? 1 : 0);

  React.useEffect(() => {
    animationProgress.value = withTiming(active ? 1 : 0, {
      duration: 300,
    });
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationProgress.value,
      [0, 1],
      [DOT_INACTIVE_COLOR, DOT_ACTIVE_COLOR],
    );

    return {
      backgroundColor,
      transform: [
        {
          scale: withTiming(active ? 1.25 : 1, {
            duration: 300,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View
      className="w-2.5 h-2.5 rounded-full mx-1"
      style={animatedStyle}
    />
  );
};

export default function Carousel() {
  const ITEM_WIDTH = width * 0.75;

  const SPACING = 14;

  const [activeIndex, setActiveIndex] = useState(0);

  const [images, setImages] = useState<ImageEnterprise[]>([]);

  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
    {},
  );

  const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

  const loadImages = async () => {
    try {
      const data = await getImagesByEnterprise(ENTERPRISE_ID);

      const initialLoadingState: Record<string, boolean> = {};

      data.forEach((item) => {
        initialLoadingState[item.id_foto] = true;
      });

      setLoadingImages(initialLoadingState);

      setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadImages();
    }, []),
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;

    const index = Math.round(scrollOffset / (ITEM_WIDTH + SPACING));

    if (index !== activeIndex && index >= 0 && index < images.length) {
      setActiveIndex(index);
    }
  };

  const handleImageLoad = (id: string) => {
    setLoadingImages((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  if (images.length === 0) {
    return (
      <View
        className="
                    w-full h-[240px]
                    rounded-[28px]
                    bg-primary/5
                    border border-primary/10
                    items-center justify-center
                    gap-4
                "
      >
        <View
          className="
                        w-16 h-16 rounded-2xl
                        bg-primary/10
                        items-center justify-center
                    "
        >
          <Ionicons name="images-outline" size={32} color="#C34342" />
        </View>

        <View className="items-center gap-1">
          <Text className="text-lg font-bold text-dark">
            Nenhuma foto encontrada
          </Text>

          <Text className="text-sm text-black/50 text-center px-10">
            Adicione imagens do seu restaurante para deixar o perfil mais
            atrativo.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="items-center">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingRight: SPACING,
        }}
      >
        {images.map((item) => (
          <View
            key={item.id_foto}
            style={{
              width: ITEM_WIDTH,
              marginRight: SPACING,
            }}
            className="
                            h-[240px]
                            rounded-[28px]
                            overflow-hidden
                            bg-black/5
                        "
          >
            {loadingImages[item.id_foto] && (
              <View className="absolute w-full h-full">
                <ImageSkeleton />
              </View>
            )}

            <Image
              source={{
                uri: item.url_foto_empresa,
              }}
              className="w-full h-full"
              resizeMode="cover"
              onLoad={() => handleImageLoad(item.id_foto)}
            />
          </View>
        ))}
      </ScrollView>

      <View className="flex-row mt-5 items-center justify-center">
        {images.map((_, index) => (
          <PaginationDot key={index} active={index === activeIndex} />
        ))}
      </View>
    </View>
  );
}
