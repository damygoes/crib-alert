import { supabase } from '@/services/supabase';
import { useEffect, useState } from 'react';

export const useAuthUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Failed to fetch user:', error.message);
        return;
      }
      if (mounted) {
        setUserId(user?.id ?? null);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, []);

  return userId;
};
