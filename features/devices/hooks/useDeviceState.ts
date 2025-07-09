import { Camera } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useDeviceState = () => {
  const [deviceId, setDeviceId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [scanning, setScanning] = useState(false);
  const [addMethod, setAddMethod] = useState<null | 'manual' | 'scan'>(null);

  const onSave = () => {
    console.log({ deviceId, deviceName });
    Alert.alert('Settings saved', `Device ID: ${deviceId}\nDevice Name: ${deviceName || '(none)'}`);
    setDeviceId('');
    setDeviceName('');
    setAddMethod(null);
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setDeviceId(data);
    setAddMethod('manual');
    setScanning(false);
  };

  const cancelScan = () => {
    setScanning(false);
    setAddMethod(null);
  };

  const handleAddMethodSelect = async (method: 'manual' | 'scan') => {
  if (method === 'manual') {
    router.push({
      pathname: '/(tabs)/settings/devices/device-form',
      params: {
        deviceId,
        deviceName,
      },
    });
  } else {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera permission is required to scan QR codes.');
      return;
    }
    setScanning(true);
    setAddMethod('scan');
  }
};

  return {
    deviceId, setDeviceId,
    deviceName, setDeviceName,
    scanning, setScanning,
    addMethod, setAddMethod,
    handleBarCodeScanned,
    cancelScan,
    handleAddMethodSelect,
    onSave,
  };
};
