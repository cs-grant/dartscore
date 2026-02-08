import { Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import SetupContext from '@/contexts/SetupContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const players: MapIterator<string> = useContext(SetupContext).playerScores.keys();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].textTint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {
        players.map(playerName => (
          <Tabs.Screen
            name="Scores"
            options={{
              title: playerName,
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="person" color={color} />,
            }}
          />
        ))
      }
    </Tabs>
  );
}
