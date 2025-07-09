import { Image } from 'expo-image';
import { SafeAreaView, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { COLORS } from '@/constants/Colors';
import { ScannerController } from '@/features/devices/components/scanning/ScannerController';
import { router } from 'expo-router';
import { AddDeviceSection } from '../components/AddDeviceSection';
import { useDeviceState } from '../hooks/useDeviceState';

export default function DevicesScreen() {

  const state = useDeviceState();

   const handleNavigateToList = () => {
      router.push('/settings/devices/connected-devices');
    };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: COLORS.light.muted, dark: COLORS.dark.muted }}
      headerImage={<Image source={require('@/assets/images/baby-logo.png')} style={styles.headerImage} contentFit='cover' />}
    >
      <SafeAreaView style={styles.container}>
        {!state.addMethod && <AddDeviceSection onSelect={state.handleAddMethodSelect} />}

        <ThemedCard onPress={handleNavigateToList}>
          <ThemedText type="subtitle" style={styles.title}>
            Connected Devices
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            View and manage all your connected devices.
          </ThemedText>
        </ThemedCard>

        <ScannerController
          visible={state.scanning}
          onBarCodeScanned={state.handleBarCodeScanned}
          onCancel={state.cancelScan}
        />
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 24 },
  headerImage: { width: '100%', height: '100%' },
   title: {
    fontWeight: 'bold',
    fontSize: 22
  },
  subtitle: {
    color: COLORS.light.muted,
    fontSize: 14,
  },
});
