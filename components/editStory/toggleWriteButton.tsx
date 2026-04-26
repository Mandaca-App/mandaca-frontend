import { Pressable, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  text: string;
  tag: 'WRITE' | 'AUDIO';
  toggle: 'WRITE' | 'AUDIO';
  handlePress: (s: 'WRITE' | 'AUDIO') => void;
};

export default function ToggleWriteButton({
  text,
  handlePress,
  toggle,
  tag,
}: Props) {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = toggle === tag;

    return {
      backgroundColor: withTiming(isActive ? '#ffffff' : 'transparent', {
        duration: 300,
      }),
    };
  });

  return (
    <Animated.View
      style={[{ width: '50%', borderRadius: 9999 }, animatedStyle]}
    >
      <Pressable
        className="py-4 items-center rounded-full"
        onPress={() => handlePress(tag)}
      >
        <Text className="text-center">{text}</Text>
      </Pressable>
    </Animated.View>
  );
}
