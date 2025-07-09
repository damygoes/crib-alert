import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { AddMethodSelector } from '@/components/settings/AddMethodSelector';
import { BarcodeScannerModal } from '@/components/settings/BarcodeScannerModal';
import { DeviceFormModal } from '@/components/settings/DeviceForm';
import { LogSettingsToggle } from '@/components/settings/LogSettingsToggle';
import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { COLORS } from '@/constants/Colors';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';

export const screenOptions = {
  headerShown: true,
  title: 'Device & Logs',
};

export default function DeviceLogsScreen() {

  const navigation = useNavigation();

  const [keepLogs, setKeepLogs] = useState(false);

  const [deviceId, setDeviceId] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);

  const [addMethod, setAddMethod] = useState<null | 'manual' | 'scan'>(null);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setDeviceId(data);
    setAddMethod('manual');
    setScanning(false);
  };

  const cancelScan = () => {
    setScanning(false);
    setAddMethod(null);
  };

  const onSave = () => {
    console.log({ deviceId, deviceName, keepLogs });
    Alert.alert(
      'Settings saved',
      `Device ID: ${deviceId}\nDevice Name: ${deviceName || '(none)'}\nKeep Logs: ${keepLogs}`
    );
    setDeviceId('');
    setDeviceName('');
    setAddMethod(null);
  };

  const handleAddMethodSelect = async (method: 'manual' | 'scan') => {
    if (method === 'manual') {
      setAddMethod('manual');
    } else {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Camera permission is required to scan QR codes.');
        return;
      }
      setHasPermission(true);
      setAddMethod('scan');
      setScanning(true);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Device & Logs',
    });
  }, [navigation]);

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
    <SafeAreaView style={styles.container}>
      <ThemedCard style={styles.section}>
        <ThemedText type="subtitle">Log Settings</ThemedText>
        <ThemedText style={styles.description}>
          Enable or disable keeping logs for this device.
        </ThemedText>
        <LogSettingsToggle keepLogs={keepLogs} setKeepLogs={setKeepLogs} />
      </ThemedCard>

      {!addMethod && (
        <ThemedCard style={styles.section}>
          <ThemedText type="subtitle">Add a Device</ThemedText>
          <ThemedText style={styles.description}>
            Add a device manually or scan a QR code to add it automatically.
          </ThemedText>
          <AddMethodSelector onSelect={handleAddMethodSelect} />
        </ThemedCard>
      )}

      {addMethod === 'manual' && !scanning && (
        <DeviceFormModal
          visible={addMethod === 'manual'}
          deviceId={deviceId}
          deviceName={deviceName}
          onChangeDeviceId={setDeviceId}
          onChangeDeviceName={setDeviceName}
          onSave={onSave}
          onCancel={() => {
            setDeviceId('');
            setDeviceName('');
            setAddMethod(null);
          }}
        />
      )}

      <BarcodeScannerModal
        visible={scanning}
        onCancel={cancelScan}
        onBarCodeScanned={handleBarCodeScanned}
      />
    </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    headerImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    // marginVertical: 10,
  },
  description: {
    marginTop: 4,
    marginBottom: 8,
  },
});
