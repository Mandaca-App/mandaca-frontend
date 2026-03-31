import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="_mybusiness/myBusiness" />
        <Stack.Screen name="_mybusiness/menu" />
        <Stack.Screen name="_mybusiness/reservations" />
        <Stack.Screen name="_mybusiness/reviews" />
        <Stack.Screen name="_mybusiness/schedule" />
        <Stack.Screen name="_mybusiness/businessOverview" />
        <Stack.Screen name="report" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="help" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="notifications" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
