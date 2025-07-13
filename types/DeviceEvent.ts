export enum DeviceEvent {
  BabyCrying = 'baby_crying',
  MovementDetected = 'movement',
  AmbientNoise = 'ambient_noise',
  BatteryLow = 'battery_low',
  DeviceDisconnected = 'device_disconnected',
}

export type DeviceEventType = keyof typeof DeviceEvent;
