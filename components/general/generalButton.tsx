import { ActivityIndicator, Pressable, Text } from 'react-native';

type Props = {
  text: string;
  handlePress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function GeneralButton({
  text,
  handlePress,
  disabled = false,
  loading = false,
}: Props) {
  return (
    <Pressable
      className={`px-6 py-3 rounded-xl items-center ${
        disabled ? 'bg-gray-400' : 'bg-primary'
      }`}
      onPress={handlePress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-lg font-semibold text-light">{text}</Text>
      )}
    </Pressable>
  );
}
