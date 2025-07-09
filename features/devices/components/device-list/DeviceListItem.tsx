import { COLORS } from '@/constants/Colors';
import { Device } from '@/types/Device';
import { StyleSheet, Text, View } from 'react-native';
import DeviceListItemActions from './DeviceListItemActions';

interface DeviceListItemProps {
    device: Device
}

export default function DeviceListItem({device}: DeviceListItemProps) {
  return (
    <View style={styles.deviceCard}>
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{device.name || 'Unnamed Device'}</Text>
        <Text style={styles.deviceId}>{device.device_id}</Text>
      </View>
      <DeviceListItemActions deviceId={device.id} />
    </View>
  );
}

const styles = StyleSheet.create({
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
});