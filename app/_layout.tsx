import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="welcome" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="forgot-password" />
            <Stack.Screen name="home" />
            <Stack.Screen name="consultant" />
            <Stack.Screen name="(mybusiness)/myBusiness" />
            <Stack.Screen name="(mybusiness)/reservations/reservations" />
            <Stack.Screen name="(mybusiness)/reviews" />
            <Stack.Screen name="(mybusiness)/schedule" />
            <Stack.Screen name="(mybusiness)/businessOverview" />
            <Stack.Screen name="(mybusiness)/editStory" />
            <Stack.Screen name="(mybusiness)/manageImages" />
            <Stack.Screen name="(mybusiness)/menu/menu" />
            <Stack.Screen name="(mybusiness)/menu/categoryFilter" />
            <Stack.Screen name="(mybusiness)/menu/form" />
            <Stack.Screen name="(report)/report" />
            <Stack.Screen name="(report)/positivePoints" />
            <Stack.Screen name="(report)/negativePoints" />
            <Stack.Screen name="(report)/recomendations" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="(help)/help" />
            <Stack.Screen name="(help)/helpDetail" />
            <Stack.Screen name="(help)/tutorials" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="notifications" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
