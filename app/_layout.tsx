import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
// import '../global.css';
import Toast from 'react-native-toast-message';
// import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Tabs Navigation */}
        <Stack.Screen name="(tabs)" />

        {/* Auth Screens */}
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="confromPassword" />
        <Stack.Screen name="conformEmail" />
        <Stack.Screen name="terms&conditions" />
        <Stack.Screen name="emailverify" />
        <Stack.Screen name="forgetpassword" />
        <Stack.Screen name="privacypolicy" />
        <Stack.Screen name="faqs" />
        <Stack.Screen name="contactus" />
      </Stack>
      <StatusBar style="auto" />
      <Toast position="top" topOffset={40} />
    </QueryClientProvider>
  );
}
