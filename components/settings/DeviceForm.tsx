import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { COLORS } from '@/constants/Colors';
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface Props {
  visible: boolean;
  deviceId: string;
  deviceName: string;
  onChangeDeviceId: (id: string) => void;
  onChangeDeviceName: (name: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function DeviceFormModal({
  visible,
  deviceId,
  deviceName,
  onChangeDeviceId,
  onChangeDeviceName,
  onSave,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onCancel}>
      <View style={styles.container}>
        <View style={styles.card}>
          <ThemedText type="subtitle">Device Setup</ThemedText>
          <View style={styles.inputContainer }>
            <ThemedText>Device ID</ThemedText>
            <TextInput
              value={deviceId}
              onChangeText={onChangeDeviceId}
              placeholder="Enter device ID"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer }>
            <ThemedText>Device Name (optional)</ThemedText>
            <TextInput
              value={deviceName}
              onChangeText={onChangeDeviceName}
              placeholder="e.g. Baby's Crib"
              style={styles.input}
            />
          </View>

          <View style={styles.formButtons}>
            <ThemedButton
              style={{
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: COLORS.light.border,
              }}
              onPress={onCancel}
            >
              <Text style={{ color: COLORS.light.black }}>Cancel</Text>
            </ThemedButton>
            <ThemedButton onPress={onSave}>
              <Text style={{ color: COLORS.light.white }}>Save</Text>
            </ThemedButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.black,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: COLORS.light.white,
    borderRadius: 12,
    padding: 24,
    shadowColor: COLORS.dark.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    gap: 14
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
    marginBottom: 16,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12,
  },
});
