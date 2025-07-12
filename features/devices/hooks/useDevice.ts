import { useAuthUserId } from '@/hooks/useAuthUserId';
import { supabase } from '@/services/supabase';
import { Device, DeviceCreationInput, DeviceUpdateInput } from '@/types/Device';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useQuery as useSingleQuery,
} from '@tanstack/react-query';

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

  const useDeviceById = (deviceId: string) =>
    useSingleQuery<Device | null>({
      queryKey: ['device', deviceId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('devices')
          .select('*')
          .eq('id', deviceId)
          .eq('user_id', userId)
          .single();

        if (error) throw error;
        return data;
      },
      enabled: !!deviceId && !!userId,
    });

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
    onSuccess: invalidateDevices,
  });

  const updateDevice = useMutation({
    mutationFn: async (update: DeviceUpdateInput) => {
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
    onSuccess: invalidateDevices,
  });

  const deleteDevice = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('devices').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: invalidateDevices,
  });

  return {
    devices,
    isLoading,
    isError,
    error,
    addDevice: addDevice.mutateAsync,
    isAddingDevice: addDevice.isPending,
    updateDevice: updateDevice.mutateAsync,
    isUpdatingDevice: updateDevice.isPending,
    deleteDevice: deleteDevice.mutateAsync,
    isDeletingDevice: deleteDevice.isPending,
    useDeviceById,
  };
}
