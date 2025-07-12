import { ThemedButton } from '@/components/ThemedButton';
import { COLORS } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { supabase } from '@/services/supabase';
import { router } from 'expo-router';
import { Alert, Text } from 'react-native';

export function LogoutButton() {
  const backgroundColor = useThemeColor({}, 'danger');

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout failed:', error.message);

      Alert.alert(
        'Logout Failed',
        'An error occurred while trying to log out. Please try again later.'
      );

      return;
    }

    router.replace('/login');
  };

  return (
    <ThemedButton style={{ backgroundColor }} onPress={handleLogout}>
      <Text
        style={{ color: COLORS.light.white, fontWeight: '600', fontSize: 16 }}
      >
        Log out
      </Text>
    </ThemedButton>
  );
}
