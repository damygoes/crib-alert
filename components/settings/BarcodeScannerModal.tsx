import { ThemedButton } from '@/components/ThemedButton';
import { COLORS } from '@/constants/Colors';
import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onBarCodeScanned: (event: { data: string }) => void;
}

export function BarcodeScannerModal({ visible, onCancel, onBarCodeScanned }: Props) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onCancel}>
      <View style={styles.scannerContainer}>
        <Text> Camera </Text>
      
        <View style={styles.scannerFooter}>
          <ThemedButton onPress={onCancel}><Text>Cancel</Text></ThemedButton>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scannerContainer: {
    flex: 1,
    backgroundColor: COLORS.light.black,
    justifyContent: 'flex-end',
  },
  scannerFooter: {
    padding: 16,
    backgroundColor: COLORS.light.white,
    alignItems: 'center',
  },
});

  {/* <Camera
          style={StyleSheet.absoluteFill}
          type={CameraType.back}
          onBarCodeScanned={onBarCodeScanned}
        /> */}