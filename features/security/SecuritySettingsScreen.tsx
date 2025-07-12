import { Image } from 'expo-image';
import { SafeAreaView, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { COLORS } from '@/constants/Colors';
import { SecuritySettingsCard } from './SecuritySettingsCard';

export default function SecuritySettingsScreen() {
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
          contentFit="cover"
        />
      }
    >
      <SafeAreaView style={styles.container}>
        <SecuritySettingsCard />
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 24 },
  headerImage: { width: '100%', height: '100%' },
});
