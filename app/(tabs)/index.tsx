import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { COLORS } from '@/constants/Colors';
import { useSupabaseSession } from '@/services/SupabaseAuthProvider';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function HomeScreen() {

  const { session } = useSupabaseSession();

  useEffect(() => {
    if (!session) {
      router.replace('/login');
    }
  }, [session]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: COLORS.light.muted,
        dark: COLORS.dark.muted,
      }}
      headerImage={
        <Image
          source={require('@/assets/images/baby-logo.png')}
          style={styles.headerImage}
          contentFit='cover'
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Crib Alert</ThemedText>
        <ThemedText type="subtitle">Monitoring your baby&apos;s sleep</ThemedText>
      </ThemedView>

      <ThemedCard>
        <ThemedText type="subtitle" style={{ fontWeight: '500'}}>Latest Status</ThemedText>
        <ThemedText>All quiet — your baby is sleeping peacefully. 💤</ThemedText>
        <ThemedButton style={{ marginTop: 12 }} onPress={() => alert('Test cry triggered')}>
          Trigger Test Cry
        </ThemedButton>
      </ThemedCard>

      <ThemedCard>
        <ThemedText type="subtitle" style={{ fontWeight: '500'}}>Need help?</ThemedText>
        <ThemedText>Tap the Settings tab to configure devices and log preferences.</ThemedText>
      </ThemedCard>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    gap: 8,
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
