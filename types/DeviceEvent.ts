export enum DeviceEvent {
  BabyCrying = 'baby_crying',
  Movement = 'movement',
  BatteryLow = 'battery_low',
}

export type DeviceEventType = keyof typeof DeviceEvent;
