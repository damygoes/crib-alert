import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { COLORS } from '@/constants/Colors';
import { AddDeviceSection } from '../AddDeviceSection';
import { DeviceSettingsCard } from '../DeviceSettingsCard';
import { useDeviceLogState } from '../hooks/useDeviceLogState';
import { ScannerController } from '../ScannerController';

export default function DeviceLogsScreen() {
  const navigation = useNavigation();
  const state = useDeviceLogState();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: 'Device & Logs' });
  }, [navigation]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: COLORS.light.muted, dark: COLORS.dark.muted }}
      headerImage={<Image source={require('@/assets/images/baby-logo.png')} style={styles.headerImage} contentFit='cover' />}
    >
      <SafeAreaView style={styles.container}>
        <DeviceSettingsCard keepLogs={state.keepLogs} setKeepLogs={state.setKeepLogs} />

        {!state.addMethod && <AddDeviceSection onSelect={state.handleAddMethodSelect} />}

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
});
