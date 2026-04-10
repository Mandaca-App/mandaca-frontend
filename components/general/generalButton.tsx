import { Pressable, Text } from 'react-native';

type Props = {
  text: string;
  handlePress: () => void;
};
export default function GeneralButton({ text, handlePress }: Props) {
  return (
    <Pressable
      className="px-6 py-3 bg-primary rounded-xl items-center"
      onPress={handlePress}
    >
      <Text className="text-lg font-semibold text-light">{text}</Text>
    </Pressable>
  );
}
