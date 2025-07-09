import { Stack } from 'expo-router';

export default function SettingsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f4f4f5',
        },
        headerTintColor: '#000',
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
    </Stack>
  );
}
