import { COLORS } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';

export default function SettingsStackLayout() {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  console.log("SettingsStackLayout rendered with theme:", theme);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: isDarkMode ? COLORS.dark.background : COLORS.light.background,
        },
        headerTintColor: isDarkMode ? COLORS.dark.text : COLORS.light.text,
        headerTitleStyle: {
          fontSize: 20, 
          fontWeight: 'bold', 
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerTransparent: true,
          headerTitle: '',
          headerShadowVisible: false,
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="device-logs" 
        options={{ 
          title: 'Device & Logs',
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="general" 
        options={{ 
          title: 'General Settings',
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="device-form" 
        options={{ 
          title: 'Device Setup',
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}
