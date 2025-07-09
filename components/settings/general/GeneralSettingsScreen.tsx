import { Image } from 'expo-image';
import { SafeAreaView, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { LogoutButton } from '@/components/settings/LogoutButton';
import { COLORS } from '@/constants/Colors';

export default function GeneralSettingsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: COLORS.light.muted, dark: COLORS.dark.muted }}
      headerImage={
        <Image
          source={require('@/assets/images/baby-logo.png')}
          style={styles.headerImage}
          contentFit="cover"
        />
      }
    >
      <SafeAreaView style={styles.container}>
        <ThemedCard>
          <ThemedText style={styles.sectionTitle}>Account</ThemedText>
          <LogoutButton />
        </ThemedCard>

        <ThemedCard>
          <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>
          <ThemedText style={styles.placeholder}>Theme & language coming soon</ThemedText>
        </ThemedCard>
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    padding: 24,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  placeholder: {
    color: COLORS.light.muted,
    fontSize: 14,
  },
});
