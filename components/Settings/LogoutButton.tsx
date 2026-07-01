import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '@/contexts/AuthContext';

export const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: logout,
        },
      ],
    );
  };

  return (
    <Pressable
      onPress={handleLogout}
      className="rounded-2xl py-4 items-center justify-center bg-primary"
      style={styles.buttonShadow}
      accessibilityLabel="Sair da conta"
      accessibilityRole="button"
    >
      <View className="flex-row items-center gap-2">
        <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
        <Text className="text-light font-bold text-lg">Sair da conta</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonShadow: {
    shadowColor: '#C34342',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
