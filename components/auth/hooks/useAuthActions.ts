import { supabase } from '@/services/supabase';

export const useAuthActions = () => {
  const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password, options: {
      emailRedirectTo: 'crib-alert://auth-callback',
    } });
  };

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  return { signUp, signIn, signOut };
};
