import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { COLORS } from '@/constants/Colors';
import { useDevices } from '@/features/devices/hooks/useDevice';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditDevice() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const navigation = useNavigation();

  const { useDeviceById, updateDevice, isUpdatingDevice } = useDevices();
  const { data: device, isLoading } = useDeviceById(id);

  const [name, setName] = useState('');

  useEffect(() => {
    if (device?.name) {
      setName(device.name);
    }
  }, [device]);

  useLayoutEffect(() => {
    if (device?.name) {
      navigation.setOptions({ title: `Edit ${device.name}` });
    }
  }, [device, navigation]);

  const handleSave = async () => {
    if (!id) return;

    try {
      await updateDevice({ id, name });
      Alert.alert('Success', 'Device name updated.');
      router.back();
    } catch (err: any) {
      console.error('Update error:', err.message);
      Alert.alert('Error', 'Failed to update device.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.light.primary} />
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>Device not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.label}>Device Name</ThemedText>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter device name"
        style={styles.input}
      />

      <View style={styles.deviceIdBox}>
        <ThemedText style={styles.label}>Device ID:</ThemedText>
        <Text
          style={styles.deviceIdText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {device.device_id}
        </Text>
      </View>

      <View style={styles.buttons}>
        <ThemedButton style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </ThemedButton>

        <ThemedButton onPress={handleSave} disabled={isUpdatingDevice}>
          {isUpdatingDevice ? (
            <ActivityIndicator color={COLORS.light.white} />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </ThemedButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    backgroundColor: COLORS.light.white,
  },
  label: {
    fontSize: 16,
    color: COLORS.light.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.light.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.light.white,
  },
  deviceIdBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
  },
  deviceIdText: {
    color: COLORS.light.muted,
    fontSize: 14,
    maxWidth: '60%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  cancelButtonText: {
    color: COLORS.light.black,
  },
  saveButtonText: {
    color: COLORS.light.white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
