import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  audio: string;
  setAudio: (s: string) => void;
};

export default function AudioBox({ audio: _audio, setAudio: _setAudio }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withRepeat(withTiming(1.2, { duration: 600 }), -1, true);
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
  };

  return (
    <View className="w-full rounded-xl px-4 py-3 h-60 gap-4 bg-white border border-black/15 items-center justify-center">
      <Animated.View style={animatedStyle}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          className="h-28 w-28 bg-primary rounded-full justify-center items-center"
        >
          <Ionicons name="mic" size={30} color="#FFFFFF" />
        </Pressable>
      </Animated.View>

      <Text className="text-black/60">Toque para começar a gravar</Text>
    </View>
  );
}
