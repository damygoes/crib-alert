import { ThemedButton } from '@/components/ThemedButton';
import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { useDevices } from '@/features/devices/hooks/useDevice';
import { useDeviceLogSubscription } from '@/features/logs/hooks/useDeviceLogSubscription';
import { simulateDeviceLog } from '@/lib/dev/simulator';
import { DeviceEvent } from '@/types/DeviceEvent';
import { View } from 'react-native';

export default function MonitorView() {
  const { devices } = useDevices();
  const firstDevice = devices?.[0];

  useDeviceLogSubscription(firstDevice?.device_id || '');
  
  if (!firstDevice) return null;

  const handleSimulateEvent = (eventType: DeviceEvent) => {
    simulateDeviceLog({
      device_id: firstDevice.device_id,
      event_type: eventType,
    });
  };

  return (
    <ThemedCard>
      <ThemedText type="subtitle" style={{ fontWeight: '500', marginBottom: 8 }}>
        Latest Status
      </ThemedText>
      <ThemedText>All quiet — your baby is sleeping peacefully. 💤</ThemedText>

      <View style={{ marginTop: 16 }}>
        <ThemedText type="subtitle" style={{ fontWeight: '500', marginBottom: 8 }}>
          Simulate Events
        </ThemedText>

        {Object.values(DeviceEvent).map((eventType) => (
          <ThemedButton
            key={eventType}
            style={{ marginBottom: 8 }}
            onPress={() => handleSimulateEvent(eventType)}
          >
            Simulate {eventType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </ThemedButton>
        ))}
      </View>
    </ThemedCard>
  );
}
