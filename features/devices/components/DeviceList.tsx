import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { COLORS } from '@/constants/Colors';
import { useDevices } from '../hooks/useDevice';

export default function DeviceList() {
  const {
    devices,
    isLoading,
    isError,
    error,
    deleteDevice,
  } = useDevices();

  const handleDelete = (id: string) => {
    Alert.alert('Delete Device', 'Are you sure you want to remove this device?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDevice.mutateAsync(id);
          } catch (err: any) {
            console.error('Delete error:', err.message);
            Alert.alert('Error', 'Failed to delete device.');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.deviceCard}>
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{item.name || 'Unnamed Device'}</Text>
        <Text style={styles.deviceId}>{item.device_id}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Feather name="trash-2" size={20} color={COLORS.dark.danger} />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="small" color={COLORS.light.primary} />
        <Text style={styles.loadingText}>Loading devices...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load devices: {error?.message}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.retryText}>Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!devices || devices.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No devices found. Add one to get started.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 16,
    flexGrow: 1,
    gap: 12,
  },
  deviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.light.card,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.light.black,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.light.text,
  },
  deviceId: {
    fontSize: 12,
    color: COLORS.light.muted,
    marginTop: 2,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  loadingText: {
    marginTop: 8,
    color: COLORS.light.text,
  },
  errorText: {
    color: COLORS.dark.danger,
    textAlign: 'center',
  },
  retryText: {
    color: COLORS.light.primary,
    marginTop: 6,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.light.muted,
    textAlign: 'center',
  },
});
