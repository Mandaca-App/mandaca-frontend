import { getImagesEnterprise } from '@/services/getImagesEnterprise';
import { ImageEnterprise } from '@/types/imageEnterprise';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    View,
} from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';


const { width } = Dimensions.get('window');

const DOT_ACTIVE_COLOR = '#C34342';
const DOT_INACTIVE_COLOR = '#C7C7CC';

interface PaginationDotProps {
    active: boolean;
}

const PaginationDot = ({ active }: PaginationDotProps) => {
    const animationProgress = useSharedValue(active ? 1 : 0);

    useEffect(() => {
        animationProgress.value = withTiming(active ? 1 : 0, { duration: 300 });
    }, [active]);

    const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            animationProgress.value,
            [0, 1],
            [DOT_INACTIVE_COLOR, DOT_ACTIVE_COLOR],
        );

        const scale = withTiming(active ? 1.2 : 1.0, { duration: 300 });

        return {
            backgroundColor,
            transform: [{ scale }],
        };
    });

    return (
        <Animated.View className="w-2.5 h-2.5 rounded-full mx-1" style={animatedStyle} />
    );
};

export default function Carousel() {
    const ITEM_WIDTH = width * 0.8;
    const SPACING = 8;

    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState<ImageEnterprise[]>([]);

    const ENTERPRISE_ID = 'caa68f64-b68e-4327-90f0-264ca1bb73e2';

    useEffect(() => {
        const loadImages = async () => {
            try {
                const data = await getImagesEnterprise(ENTERPRISE_ID);
                setImages(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadImages();
    }, []);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollOffset / (ITEM_WIDTH + SPACING));

        if (index !== activeIndex && index >= 0 && index < images.length) {
            setActiveIndex(index);
        }
    };

    return (
        <View className="flex-1 items-center justify-center">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH + SPACING}
                decelerationRate="fast"
                onMomentumScrollEnd={handleScroll}
                scrollEventThrottle={16}
            >
                {images.map((item) => (
                    <View
                        key={item.id_foto}
                        style={{ width: ITEM_WIDTH, marginRight: SPACING }}
                        className="h-[200px] rounded-2xl overflow-hidden"
                    >
                        <Image
                            source={{ uri: item.url_foto_empresa }}
                            className="w-full h-full"
                        />
                    </View>
                ))}
            </ScrollView>

            <View className="flex-row mt-4 items-center justify-center">
                {images.map((_, index) => (
                    <PaginationDot
                        key={index}
                        active={index === activeIndex}
                    />
                ))}
            </View>
        </View>
    );
}