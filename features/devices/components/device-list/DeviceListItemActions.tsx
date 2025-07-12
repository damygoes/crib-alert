import { COLORS } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, TouchableOpacity, View } from 'react-native';
import { useDevices } from '../../hooks/useDevice';

export default function DeviceListItemActions({
  deviceId,
}: {
  deviceId: string;
}) {
  const { deleteDevice } = useDevices();

  const handleDelete = () => {
    Alert.alert(
      'Delete Device',
      'Are you sure you want to remove this device?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDevice(deviceId);
            } catch (err: any) {
              console.error('Delete error:', err.message);
              Alert.alert('Error', 'Failed to delete device.');
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push({
      pathname: '/(tabs)/settings/devices/edit/[id]',
      params: { id: deviceId },
    });
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <TouchableOpacity onPress={handleEdit}>
        <Feather name="edit-2" size={20} color={COLORS.dark.black} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete}>
        <Feather name="trash-2" size={20} color={COLORS.dark.danger} />
      </TouchableOpacity>
    </View>
  );
}
