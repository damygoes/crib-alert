import { COLORS } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';

export default function SettingsStackLayout() {

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

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
        name="security-settings" 
        options={{ 
          title: 'Security & Privacy',
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
        name="devices/device-form" 
        options={{ 
          title: 'Device Setup',
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="devices/devices" 
        options={{ 
          title: 'Device Management',
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name="devices/connected-devices" 
        options={{ 
          title: 'My Devices',
          presentation: 'modal',
        }} 
      />
      <Stack.Screen 
        name={"devices/edit/[id]"} 
        options={{ 
          title: 'Edit Device',
          presentation: 'modal',
        }} 
      />
    </Stack>
  );
}
