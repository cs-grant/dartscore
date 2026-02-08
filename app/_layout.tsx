import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import SetupContext from '@/contexts/SetupContext';
import 'react-native-reanimated';

import { useColorScheme } from 'react-native';
import { usePlayerScores } from '@/hooks/usePlayerScores';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [initialScore, setInitialScore] = useState<number>(301);
  const [playerScores, dispatchPlayerScores] = usePlayerScores();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SetupContext.Provider value={{
        initial: initialScore,
        setInitial: setInitialScore,
        playerScores,
        dispatchPlayerScores,
      }}>
        <Stack>
          <Stack.Screen name="Setup" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SetupContext.Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
