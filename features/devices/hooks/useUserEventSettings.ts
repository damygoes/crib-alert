import { useAuthUserId } from '@/hooks/useAuthUserId';
import { supabase } from '@/services/supabase';
import { DeviceEvent } from '@/types/DeviceEvent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export type UserEventSetting = {
  id: string;
  user_id: string;
  event_type: DeviceEvent;
  sound_name: string;
  created_at: string;
  updated_at: string;
};

export function useUserEventSettings() {
  const userId = useAuthUserId();
  const queryClient = useQueryClient();

  const invalidateSettings = () => {
    queryClient.invalidateQueries({
      queryKey: ['user_event_settings', userId],
    });
  };

  const {
    data: eventSettings,
    isLoading,
    isError,
    error,
  } = useQuery<UserEventSetting[]>({
    queryKey: ['user_event_settings', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_event_settings')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const updateSetting = useMutation({
    mutationFn: async ({
      event_type,
      sound_name,
    }: {
      event_type: DeviceEvent;
      sound_name: string;
    }) => {
      const { data, error } = await supabase
        .from('user_event_settings')
        .upsert(
          {
            user_id: userId,
            event_type,
            sound_name,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,event_type' } // match the unique constraint
        )
        .select()
        .single();
      if (error) {
        console.error('Error updating setting:', error);
        throw error;
      }
      return data;
    },
    onSuccess: invalidateSettings,
  });

  return {
    eventSettings,
    isLoading,
    isError,
    error,
    updateSetting: updateSetting.mutateAsync,
    isUpdating: updateSetting.isPending,
  };
}
