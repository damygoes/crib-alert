// import { Camera } from 'expo-camera';
// import { useState } from 'react';
// import { Alert, StyleSheet } from 'react-native';

// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { AddMethodSelector } from '@/components/settings/AddMethodSelector';
// import { BarcodeScannerModal } from '@/components/settings/BarcodeScannerModal';
// import { DeviceFormModal } from '@/components/settings/DeviceForm';
// import { LogoutButton } from '@/components/settings/LogoutButton';
// import { LogSettingsToggle } from '@/components/settings/LogSettingsToggle';
// import { ThemedCard } from '@/components/ThemedCard';
// import { ThemedText } from '@/components/ThemedText';
// import { COLORS } from '@/constants/Colors';
// import { Image } from 'expo-image';

// export default function SettingsScreen() {
//   const [keepLogs, setKeepLogs] = useState(false);

//   const [deviceId, setDeviceId] = useState('');
//   const [deviceName, setDeviceName] = useState('');

//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [scanning, setScanning] = useState(false);

//   const [addMethod, setAddMethod] = useState<null | 'manual' | 'scan'>(null);

//   const handleBarCodeScanned = ({ data }: { data: string }) => {
//     setDeviceId(data);
//     setAddMethod('manual');
//     setScanning(false);
//   };

//   const cancelScan = () => {
//     setScanning(false);
//     setAddMethod(null);
//   };

//   const onSave = () => {
//     console.log({ deviceId, deviceName, keepLogs });
//     Alert.alert(
//       'Settings saved',
//       `Device ID: ${deviceId}\nDevice Name: ${deviceName || '(none)'}\nKeep Logs: ${keepLogs}`
//     );
//     setDeviceId('');
//     setDeviceName('');
//     setAddMethod(null);
//   };

//   const handleAddMethodSelect = async (method: 'manual' | 'scan') => {
//     if (method === 'manual') {
//       setAddMethod('manual');
//     } else {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission required', 'Camera permission is required to scan QR codes.');
//         return;
//       }
//       setHasPermission(true);
//       setAddMethod('scan');
//       setScanning(true);
//     }
//   };

//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{
//         light: COLORS.light.muted,
//         dark: COLORS.dark.muted,
//       }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/settings-illustration.png')}
//           style={styles.headerImage}
//           contentFit='cover'
//         />
//       }
//     >
//       <ThemedCard>
//         <ThemedText type="subtitle">Log Settings</ThemedText>
//         <LogSettingsToggle keepLogs={keepLogs} setKeepLogs={setKeepLogs} />
//       </ThemedCard>

//       {!addMethod && (
//         <ThemedCard>
//           <ThemedText type="subtitle">Add a Device</ThemedText>
//           <AddMethodSelector onSelect={handleAddMethodSelect} />
//         </ThemedCard>
//       )}

//       {addMethod === 'manual' && !scanning && (
//         <DeviceFormModal
//           visible={addMethod === 'manual'}
//           deviceId={deviceId}
//           deviceName={deviceName}
//           onChangeDeviceId={setDeviceId}
//           onChangeDeviceName={setDeviceName}
//           onSave={onSave}
//           onCancel={() => {
//             setDeviceId('');
//             setDeviceName('');
//             setAddMethod(null);
//           }}
//         />

//       )}

//       <LogoutButton />

//       <BarcodeScannerModal
//         visible={scanning}
//         onCancel={cancelScan}
//         onBarCodeScanned={handleBarCodeScanned}
//       />
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     width: '100%',
//     height: '100%',
//   },
// });

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
