import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons'; // ✅ Import Feather icons
import { HapticTab } from '../../components/HapticTab';
import TabBarBackground from '../../components/ui/TabBarBackground';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const primaryColor = '#8034eb'; // ✅ Your primary color

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColor, // ✅ Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} /> // ✅ Feather user icon
          ),
        }}
      />
    </Tabs>
  );
}
