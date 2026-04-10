import { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  text: string;
  check: boolean;
};

export default function ChecklistButton({ text, check }: Props) {
  const progress = useSharedValue(check ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(check ? 1 : 0, { duration: 250 });
  }, [check, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ['transparent', '#C34342'], // verde
      ),
      borderColor: interpolateColor(
        progress.value,
        [0, 1],
        ['#000', '#C34342'],
      ),
    };
  });

  return (
    <Pressable className="w-full flex-row py-3 px-6 bg-secondary items-center rounded-xl gap-3">
      <Animated.View
        style={animatedStyle}
        className="w-6 h-6 rounded-full border"
      />

      <Text className="text-lg font-semibold">{text}</Text>
    </Pressable>
  );
}
