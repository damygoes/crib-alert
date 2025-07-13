import { DeviceEvent } from '@/types/DeviceEvent';

export const AVAILABLE_SOUNDS = [
  { label: 'Default Cry', value: 'default_baby_cry.mp3' }, // BabyCrying
  { label: 'Soft Chime', value: 'soft_chime.mp3' }, // MovementDetected
  { label: 'White Noise', value: 'white_noise.mp3' }, // AmbientNoise
  { label: 'Beep Warning', value: 'beep_warning.mp3' }, // BatteryLow
  { label: 'High-Pitched Alert', value: 'high_pitch_alert.mp3' }, // DeviceDisconnected
];

export const SOUND_FILES = {
  'default_baby_cry.mp3': require('@/assets/sounds/baby/default_baby_cry.mp3'),
  'soft_chime.mp3': require('@/assets/sounds/notifications/soft_chime.mp3'),
  'white_noise.mp3': require('@/assets/sounds/environment/white_noise.mp3'),
  'alarm_alert.mp3': require('@/assets/sounds/alerts/alarm_alert.mp3'),
  'beep_warning.mp3': require('@/assets/sounds/alerts/beep_warning.mp3'),
  'high_pitch_alert.mp3': require('@/assets/sounds/alerts/high_pitch_alert.mp3'),
  'soft_knock.mp3': require('@/assets/sounds/notifications/soft_knock.mp3'),
};

export const DEFAULT_EVENT_SOUNDS: Record<DeviceEvent, string> = {
  [DeviceEvent.BabyCrying]: 'default_baby_cry.mp3',
  [DeviceEvent.MovementDetected]: 'soft_chime.mp3',
  [DeviceEvent.AmbientNoise]: 'white_noise.mp3',
  [DeviceEvent.BatteryLow]: 'beep_warning.mp3',
  [DeviceEvent.DeviceDisconnected]: 'high_pitch_alert.mp3',
};
