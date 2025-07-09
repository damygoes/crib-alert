export type Device = {
  id: string;
  user_id: string;
  device_id: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

export type DeviceCreationInput = {
  user_id: string;
  device_id: string;
  name?: string;
}
export type DeviceUpdateInput = {
  id: string;
  name?: string;
}