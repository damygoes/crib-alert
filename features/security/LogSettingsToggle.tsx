import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { COLORS } from '@/constants/Colors';
import { useDebounce } from '@/hooks/useDebounce';
import { useKeepLogs } from '@/hooks/useUserSettings';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';

export function LogSettingsToggle() {
  const { keepLogs, updateKeepLogs, isLoading, isUpdating } = useKeepLogs();
  const [localValue, setLocalValue] = useState<boolean>(!!keepLogs);

  // Sync initial value when fetched
  useEffect(() => {
    if (typeof keepLogs === 'boolean') {
      setLocalValue(keepLogs);
    }
  }, [keepLogs]);

  // Debounced mutation trigger
  const debouncedUpdate = useDebounce((val: boolean) => {
    updateKeepLogs(val, {
      onSuccess: () => {
        Alert.alert('Success', 'Keep logs preference updated.');
      },
      onError: (err) => {
        console.error(err);
        Alert.alert('Error', 'Failed to update keep logs.');
      },
    });
  }, 600);

  const handleToggle = (newVal: boolean) => {
    setLocalValue(newVal);
    debouncedUpdate(newVal);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.row}>
        <ThemedText>Keep logs for insights</ThemedText>
        <Switch
          value={localValue}
          onValueChange={handleToggle}
          disabled={isLoading}
        />
      </View>

      {isUpdating && <Text style={styles.statusText}>Updating...</Text>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 12,
    color: COLORS.dark.muted,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
});
