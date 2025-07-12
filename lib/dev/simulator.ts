import { supabase } from '@/services/supabase';
import { DeviceEvent } from '@/types/DeviceEvent';

export const simulateDeviceLog = async ({
  device_id,
  event_type,
  value = {},
}: {
  device_id: string;
  event_type: DeviceEvent;
  value?: Record<string, any>;
}) => {
  console.log(
    `Simulating device log for ${device_id} with event ${event_type}`,
    value
  );
  const { error, data } = await supabase.from('device_logs').insert([
    {
      device_id,
      event_type,
      value,
    },
  ]);

  if (error) {
    console.error('❌ Failed to insert device log:', error.message);
  } else {
    console.log('✅ Device log inserted:', data);
  }
};
