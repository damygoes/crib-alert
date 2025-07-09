import { supabase } from '@/services/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useKeepLogs = () => {
  const queryClient = useQueryClient();

  const fetchKeepLogs = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('keep_logs')
      .single();

    if (error) throw error;
    return data.keep_logs;
  };

  const { data: keepLogs, isLoading, error } = useQuery({
    queryKey: ['keep_logs'],
    queryFn: fetchKeepLogs,
  });

  const { mutate: updateKeepLogs, isPending: isUpdating } = useMutation({
    mutationFn: async (value: boolean) => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user?.id) throw userError || new Error('User not found');

      const { error } = await supabase
        .from('users')
        .update({ keep_logs: value })
        .eq('id', userData.user.id);

      if (error) throw error;
      return value;
    },
    onSuccess: (newVal) => {
      queryClient.setQueryData(['keep_logs'], newVal);
    },
  });

  return {
    keepLogs,
    isLoading,
    isUpdating,
    error,
    updateKeepLogs,
  };
};
