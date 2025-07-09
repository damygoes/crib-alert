import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { LogSettingsToggle } from './LogSettingsToggle';

export const DeviceSettingsCard = ({ keepLogs, setKeepLogs }: {
  keepLogs: boolean;
  setKeepLogs: (value: boolean) => void;
}) => (
  <ThemedCard>
    <ThemedText type="subtitle" style={styles.title}>Log Settings</ThemedText>
    <ThemedText style={styles.description}>Enable or disable keeping logs for this device.</ThemedText>
    <LogSettingsToggle />
  </ThemedCard>
);

const styles = StyleSheet.create({
  title: { fontWeight: 'bold', fontSize: 22 },
  description: { marginBottom: 8, fontSize: 14 },
});
