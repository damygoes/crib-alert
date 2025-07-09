import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { LogSettingsToggle } from './LogSettingsToggle';

export const SecuritySettingsCard = () => (
  <ThemedCard>
    <ThemedText type="subtitle" style={styles.title}>Security Settings</ThemedText>
    <ThemedText style={styles.description}>Enable or disable keeping logs of your devices.</ThemedText>
    <LogSettingsToggle />
  </ThemedCard>
);

const styles = StyleSheet.create({
  title: { fontWeight: 'bold', fontSize: 22 },
  description: { marginBottom: 8, fontSize: 14 },
});
