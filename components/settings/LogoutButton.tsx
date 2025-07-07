import { ThemedButton } from '@/components/ThemedButton';
import { COLORS } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Alert, Text } from 'react-native';
import { useAuth } from '../auth/AuthContext';

export function LogoutButton() {
  const { setIsLoggedIn } = useAuth();
  
  const backgroundColor = useThemeColor({}, 'danger');

  const handleLogout = async () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('hasSession');
          setIsLoggedIn(false);
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <ThemedButton style={{ backgroundColor }} onPress={handleLogout}>
        <Text style={{ color: COLORS.light.white, fontWeight: '600', fontSize: 16 }}>
          Log out
        </Text>
    </ThemedButton>
  );
}
