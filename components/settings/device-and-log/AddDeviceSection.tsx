import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { AddMethodSelector } from './AddMethodSelector';

export const AddDeviceSection = ({ onSelect }: { onSelect: (method: 'manual' | 'scan') => void }) => (
  <ThemedCard>
    <ThemedText type="subtitle" style={styles.title}>Add a Device</ThemedText>
    <ThemedText style={styles.description}>
      Add a device manually or scan a QR code to add it automatically.
    </ThemedText>
    <AddMethodSelector onSelect={onSelect} />
  </ThemedCard>
);

const styles = StyleSheet.create({
  title: { fontWeight: 'bold', fontSize: 22 },
  description: { marginBottom: 8, fontSize: 14 },
});
