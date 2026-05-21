import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
  reservationId: string;
  clientName: string;
  size?: number;
  color?: string;
  bgColor?: string;
};

export const ChatIconButton = ({
  reservationId,
  clientName,
  size = 18,
  color = '#3B82F6',
  bgColor = '#EFF6FF',
}: Props) => {
  const handlePress = () => {
    router.push({
      pathname: '/(mybusiness)/(reservations)/chat' as any,
      params: {
        reservationId,
        clientName,
      },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.button, { backgroundColor: bgColor }]}
    >
      <Ionicons name="chatbubble-outline" size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
