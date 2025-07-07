import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet, Switch } from 'react-native';

interface Props {
  keepLogs: boolean;
  setKeepLogs: (val: boolean) => void;
}

export function LogSettingsToggle({ keepLogs, setKeepLogs }: Props) {
  return (
    <ThemedView style={styles.row}>
      <ThemedText>Keep logs for insights</ThemedText>
      <Switch value={keepLogs} onValueChange={setKeepLogs} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: 'transparent',
  },
});
