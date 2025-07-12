import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useDevices } from '../../hooks/useDevice';
import DeviceListItem from './DeviceListItem';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import LoadingState from './LoadingState';

export default function DeviceList() {
  const { devices, isLoading, isError, error } = useDevices();

  if (isLoading) return <LoadingState />;

  if (isError)
    return <ErrorState errorMessage={error?.message || 'An error occurred'} />;

  if (!devices || devices.length === 0) return <EmptyState />;

  return (
    <FlatList
      data={devices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DeviceListItem device={item} />}
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
});
