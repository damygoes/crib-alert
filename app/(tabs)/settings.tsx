import { Camera } from 'expo-camera';
import { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { AddMethodSelector } from '@/components/settings/AddMethodSelector';
import { BarcodeScannerModal } from '@/components/settings/BarcodeScannerModal';
import { DeviceFormModal } from '@/components/settings/DeviceForm';
import { LogoutButton } from '@/components/settings/LogoutButton';
import { LogSettingsToggle } from '@/components/settings/LogSettingsToggle';
import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { COLORS } from '@/constants/Colors';
import { Image } from 'expo-image';

export default function SettingsScreen() {
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
      <ThemedCard>
        <ThemedText type="subtitle">Log Settings</ThemedText>
        <LogSettingsToggle keepLogs={keepLogs} setKeepLogs={setKeepLogs} />
      </ThemedCard>

      {!addMethod && (
        <ThemedCard>
          <ThemedText type="subtitle">Add a Device</ThemedText>
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

      <LogoutButton />

      <BarcodeScannerModal
        visible={scanning}
        onCancel={cancelScan}
        onBarCodeScanned={handleBarCodeScanned}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '100%',
  },
});