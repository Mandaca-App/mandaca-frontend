import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image, // Importe isso
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
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

// 1. Tipagem para as Props da bolinha
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
            [DOT_INACTIVE_COLOR, DOT_ACTIVE_COLOR]
        );

        const scale = withTiming(active ? 1.2 : 1.0, { duration: 300 });

        return {
            backgroundColor,
            transform: [{ scale }],
        };
    });

    return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export default function Carousel() {
    const ITEM_WIDTH = width * 0.8;
    const SPACING = 1;
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [
        'https://picsum.photos/id/1018/800/400',
        'https://picsum.photos/id/1015/800/400',
        'https://picsum.photos/id/1019/800/400',
        'https://picsum.photos/id/1020/800/400',
        'https://picsum.photos/id/1024/800/400',
    ];

    // 2. Tipagem do evento de Scroll
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollOffset / (ITEM_WIDTH + SPACING));
        
        if (index !== activeIndex && index >= 0 && index < images.length) {
            setActiveIndex(index);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH + SPACING}
                decelerationRate="fast"
                onMomentumScrollEnd={handleScroll}
                scrollEventThrottle={16}
            >
                {images.map((uri, index) => (
                    <View
                        key={index}
                        style={[
                            styles.card,
                            {
                                width: ITEM_WIDTH,
                                marginRight: SPACING,
                            },
                        ]}
                    >
                        <Image
                            source={{ uri }}
                            style={styles.image}
                        />
                    </View>
                ))}
            </ScrollView>

            <View style={styles.paginationContainer}>
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

// ... estilos permanecem os mesmos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    paginationContainer: {
        flexDirection: 'row',
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
});