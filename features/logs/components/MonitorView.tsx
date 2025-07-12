import { ThemedButton } from '@/components/ThemedButton';
import { ThemedCard } from '@/components/ThemedCard';
import { ThemedText } from '@/components/ThemedText';
import { useDevices } from '@/features/devices/hooks/useDevice';
import { useDeviceLogSubscription } from '@/features/logs/hooks/useDeviceLogSubscription';
import { simulateDeviceLog } from '@/lib/dev/simulator';
import { DeviceEvent } from '@/types/DeviceEvent';

export default function Monitorview() {
  const { devices } = useDevices();
  const firstDevice = devices?.[0];

  useDeviceLogSubscription(firstDevice?.device_id || '');

  const handleEventSimulation = () => {
    console.log('Simulating device log for device:', firstDevice?.device_id);

    if (firstDevice) {
      simulateDeviceLog({
        device_id: firstDevice.device_id,
        event_type: DeviceEvent.BabyCrying,
      });
    }
  };

  return (
    <ThemedCard>
      <ThemedText type="subtitle" style={{ fontWeight: '500' }}>
        Latest Status
      </ThemedText>
      <ThemedText>All quiet — your baby is sleeping peacefully. 💤</ThemedText>
      <ThemedButton style={{ marginTop: 12 }} onPress={handleEventSimulation}>
        Trigger Test Cry
      </ThemedButton>
    </ThemedCard>
  );
}
