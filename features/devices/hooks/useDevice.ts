import { useAuthUserId } from '@/hooks/useAuthUserId';
import { supabase } from '@/services/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface Device {
  id: string;
  user_id: string;
  device_id: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

export interface DeviceCreationInput {
  user_id: string;
  device_id: string;
  name?: string;
}



export function useDevices() {
  const userId = useAuthUserId();
  const queryClient = useQueryClient();

  const invalidateDevices = () => {
    queryClient.invalidateQueries({ queryKey: ['devices', userId] });
  };

  const {
    data: devices,
    isLoading,
    isError,
    error,
  } = useQuery<Device[]>({
    queryKey: ['devices', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  // Add a new device
  const addDevice = useMutation({
    mutationFn: async (device: Partial<DeviceCreationInput>) => {
      const { data, error } = await supabase
        .from('devices')
        .insert({ ...device, user_id: userId })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      invalidateDevices()
    },
  });

  // Update an existing device
  const updateDevice = useMutation({
    mutationFn: async (update: { id: string; name?: string; type?: string }) => {
      const { id, ...fields } = update;
      const { data, error } = await supabase
        .from('devices')
        .update({ ...fields, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      invalidateDevices()
    },
  });

  // Delete a device
  const deleteDevice = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('devices')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      invalidateDevices()
    },
  });

  return {
    devices,
    isLoading,
    isError,
    error,
    addDevice: addDevice.mutateAsync,
    isAddingDevice: addDevice.isPending,
    updateDevice,
    deleteDevice,
  };
}