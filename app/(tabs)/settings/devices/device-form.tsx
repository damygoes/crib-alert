import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { COLORS } from '@/constants/Colors';
import { useDevices } from '@/features/devices/hooks/useDevice';

export default function DeviceForm() {
  const params = useLocalSearchParams<{
    deviceId?: string;
    deviceName?: string;
  }>();

  const [deviceId, setDeviceId] = useState(params.deviceId || '');
  const [deviceName, setDeviceName] = useState(params.deviceName || '');

  const [errors, setErrors] = useState<{ deviceId?: string }>({});

  const { addDevice, isAddingDevice } = useDevices();

  const onSave = () => {
    const newErrors: typeof errors = {};

    if (!deviceId.trim()) {
      newErrors.deviceId = 'Device ID is required.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      addDevice(
        { name: deviceName, device_id: deviceId },
        {
          onSuccess: () => {
            Alert.alert('Success', 'Device saved successfully.');
            router.back();
          },
          onError: (error) => {
            Alert.alert('Error', `Failed to save device: ${error.message}`);
          },
        }
      );
    }
  };

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <ThemedText>Device ID</ThemedText>
        <TextInput
          value={deviceId}
          onChangeText={(text) => {
            setDeviceId(text);
            if (errors.deviceId) {
              setErrors((prev) => ({ ...prev, deviceId: undefined }));
            }
          }}
          placeholder="Enter device ID"
          style={[styles.input, errors.deviceId && styles.inputError]}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.deviceId && (
          <Text style={styles.errorText}>{errors.deviceId}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <ThemedText>Device Name (optional)</ThemedText>
        <TextInput
          value={deviceName}
          onChangeText={setDeviceName}
          placeholder="e.g. Baby's Crib"
          style={styles.input}
        />
      </View>

      <View style={styles.formButtons}>
        <ThemedButton
          style={styles.cancelButton}
          disabled={isAddingDevice}
          onPress={handleNavigateBack}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </ThemedButton>
        <ThemedButton onPress={onSave}>
          {isAddingDevice ? (
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
  inputContainer: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.light.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.light.white,
  },
  inputError: {
    borderColor: COLORS.dark.danger,
  },
  errorText: {
    color: COLORS.dark.danger,
    fontSize: 12,
    marginTop: 2,
  },
  formButtons: {
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
});
