import { SOUND_FILES } from '@/constants/sounds';
import { useUserEventSettings } from '@/features/devices/hooks/useUserEventSettings';
import { supabase } from '@/services/supabase';
import { useAudioPlayer } from 'expo-audio';
import { useEffect, useMemo } from 'react';
import { Alert } from 'react-native';

export const useDeviceLogSubscription = (deviceId: string) => {
  const { eventSettings } = useUserEventSettings();

  // ✅ Call hooks at top level — one per sound
  const player_default_cry = useAudioPlayer(SOUND_FILES['default_baby_cry.mp3']);
  const player_soft_chime = useAudioPlayer(SOUND_FILES['soft_chime.mp3']);
  const player_white_noise = useAudioPlayer(SOUND_FILES['white_noise.mp3']);
  const player_beep_warning = useAudioPlayer(SOUND_FILES['beep_warning.mp3']);
  const player_high_pitch = useAudioPlayer(SOUND_FILES['high_pitch_alert.mp3']);

  // ✅ Map sound names to corresponding players
  const players = useMemo<Record<
    | 'default_baby_cry.mp3'
    | 'soft_chime.mp3'
    | 'white_noise.mp3'
    | 'beep_warning.mp3'
    | 'high_pitch_alert.mp3',
    ReturnType<typeof useAudioPlayer>
  >>(() => ({
    'default_baby_cry.mp3': player_default_cry,
    'soft_chime.mp3': player_soft_chime,
    'white_noise.mp3': player_white_noise,
    'beep_warning.mp3': player_beep_warning,
    'high_pitch_alert.mp3': player_high_pitch,
  }), [player_default_cry, player_soft_chime, player_white_noise, player_beep_warning, player_high_pitch]);

  useEffect(() => {
    if (!deviceId || !eventSettings) return;

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
          if (log.device_id !== deviceId) return;

          const matched = eventSettings.find((s) => s.event_type === log.event_type);
          if (!matched) return;

          const soundName = matched.sound_name as keyof typeof players;
          const player = players[soundName];

          if (!player) {
            console.warn('No player found for sound:', soundName);
            return;
          }

          Alert.alert(
            'Alert',
            `🔔 ${formatEvent(log.event_type)} detected`,
            [
              {
                text: 'OK',
                onPress: () => {
                  player.pause();
                  player.remove();
                },
              },
            ],
            { cancelable: false }
          );

          player.play();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [deviceId, eventSettings, players]);

  function formatEvent(event: string) {
    return event.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
};
