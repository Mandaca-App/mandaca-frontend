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
        <Stack.Screen name="(mybusiness)/myBusiness" />
        <Stack.Screen name="(mybusiness)/menu" />
        <Stack.Screen name="(mybusiness)/reservations" />
        <Stack.Screen name="(mybusiness)/reviews" />
        <Stack.Screen name="(mybusiness)/schedule" />
        <Stack.Screen name="(mybusiness)/businessOverview" />
        <Stack.Screen name="(mybusiness)/editStory" />
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
