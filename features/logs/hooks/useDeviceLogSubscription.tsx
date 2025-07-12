import { supabase } from '@/services/supabase';
import { DeviceEvent } from '@/types/DeviceEvent';
import { useAudioPlayer } from 'expo-audio';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export const useDeviceLogSubscription = (deviceId: string) => {
  const audioSource = require('../../../assets/sounds/baby-cry.mp3');
  const player = useAudioPlayer(audioSource);

  useEffect(() => {
    if (!deviceId) return;

    const channel = supabase
      .channel('device_logs')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'device_logs',
        },
        (payload) => {
          const log = payload.new;
          if (log.device_id === deviceId) {
            console.log('📡 New log for my device:', log);
            console.log('Event type:', log.event_type);

            if (log.event_type === DeviceEvent.BabyCrying) {
              console.log('Alert and sound should trigger now');

              Alert.alert(
                'Alert',
                '👶 Baby is crying!',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      player.pause();
                      player.remove();
                      console.log('Audio stopped on alert dismissal');
                    },
                  },
                ],
                { cancelable: false } // user must tap OK
              );

              player.play();
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      console.log(
        'Unsubscribed from device_logs channel for device:',
        deviceId
      );
    };
  }, [deviceId, player]);
};

/**
 *    //   const channel = supabase
    // .channel('device_logs')
    // .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'device_logs' }, payload => {
    //   console.log('New device log:', payload);
    // })
    // .subscribe();

    // Optional: log subscription status
 */
