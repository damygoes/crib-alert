import { Image } from 'expo-image';
import { router, useNavigation } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { COLORS } from '@/constants/Colors';
import { useLayoutEffect } from 'react';

export const screenOptions = {
  title: 'Settings',
};

export default function SettingsScreen() {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Settings' });
  }, [navigation]);

  const handleDeviceLogsPress = () => {
    router.push('/settings/device-logs');
  };

  const handleGeneralSettingsPress = () => {
    router.push('/settings/general');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: COLORS.light.muted,
        dark: COLORS.dark.muted,
      }}
      headerImage={
        <Image
          source={require('@/assets/images/settings-illustration.png')}
          style={styles.headerImage}
          contentFit='cover'
        />
      }
    >
      <View style={styles.viewContainer}>
        <ThemedCard onPress={handleDeviceLogsPress}>
          <ThemedText type="subtitle" style={styles.title}>Device & Logs</ThemedText>
          <ThemedText style={styles.subtitle}>
            Control whether logs are kept and add new devices manually or via QR code.
          </ThemedText>
        </ThemedCard>

        <ThemedCard onPress={handleGeneralSettingsPress}>
          <ThemedText type="subtitle" style={styles.title}>General Settings</ThemedText>
          <ThemedText style={styles.subtitle}>
            Manage your account, appearance, and language preferences.
          </ThemedText>
        </ThemedCard>
        </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '100%',
  },
  viewContainer: {
   display: 'flex',
   flexDirection: 'column',
   gap: 24,
   width: '100%',
   height: '100%',
   paddingVertical: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22
  },
  subtitle: {
    color: COLORS.light.muted,
    fontSize: 14,
  },
});
