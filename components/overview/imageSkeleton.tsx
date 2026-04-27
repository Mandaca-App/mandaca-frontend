import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

export const ImageSkeleton = () => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmer.value, [0, 1], [0.3, 0.7]);

    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[styles.skeleton, animatedStyle]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E5E5',
    borderRadius: 16,
  },
});