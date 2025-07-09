import { ThemedButton } from '@/components/ThemedButton';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  onSelect: (method: 'manual' | 'scan') => void;
}

export function AddMethodSelector({ onSelect }: Props) {
  return (
    <View style={styles.buttonRow}>
      <ThemedButton style={styles.methodButton} onPress={() => onSelect('manual')}>
        Add Manually
      </ThemedButton>
      {/* <ThemedButton style={styles.methodButton} onPress={() => onSelect('scan')}>
        Scan QR Code
      </ThemedButton> */}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 12,
  },
  methodButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});