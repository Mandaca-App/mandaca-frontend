import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  showBackButton?: boolean;
  showNotificationButton?: boolean;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
  rightButtonIcon?: string;
  rightButtonColor?: string;
  rightButtonBgColor?: string;
  backButtonColor?: string;
  backButtonBgColor?: string;
  backButtonSize?: number;
};

export const Header = ({
  title,
  showBackButton = false,
  showNotificationButton = true,
  onBackPress,
  onNotificationPress,
  rightButtonIcon,
  rightButtonColor = '#2C2C2C',
  rightButtonBgColor = '#FFFFFF',
  backButtonColor = '#2C2C2C',
  backButtonBgColor = '#FFFFFF',
  backButtonSize = 10,
}: Props) => {
  const handleBack = onBackPress ? onBackPress : () => router.back();
  const handleNotification = onNotificationPress
    ? onNotificationPress
    : () => router.navigate('/notifications');

  return (
    <View className="flex flex-row justify-between items-center gap-2">
      {showBackButton ? (
        <Pressable
          className="h-8 w-8 rounded-full justify-center items-center"
          style={[
            style.cardShadow,
            { backgroundColor: backButtonBgColor, marginRight: 12 },
          ]}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={backButtonSize} color={backButtonColor} />
        </Pressable>
      ) : (
        <View className="h-8 w-8" />
      )}

      <Text className="text-lg font-semibold flex-1 text-center">{title}</Text>

      {showNotificationButton ? (
        <Pressable
          className="h-10 w-10 rounded-full justify-center items-center"
          style={[
            style.cardShadow,
            { backgroundColor: rightButtonBgColor || '#FFFFFF' },
          ]}
          onPress={handleNotification}
        >
          <Ionicons
            name={rightButtonIcon || 'notifications'}
            size={24}
            color={rightButtonColor}
          />
        </Pressable>
      ) : (
        <View className="h-10 w-10" />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.8,
    elevation: 5,
  },
});
