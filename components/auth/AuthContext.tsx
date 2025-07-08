import { supabase } from '@/services/supabase';
import { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});

export const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSupabaseSession = () => useContext(AuthContext);

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// interface AuthContextType {
//   isLoggedIn: boolean;
//   setIsLoggedIn: (val: boolean) => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   isLoggedIn: false,
//   setIsLoggedIn: () => {},
// });

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     AsyncStorage.getItem('hasSession').then(value => {
//       setIsLoggedIn(value === 'true');
//       setLoading(false);
//     });
//   }, []);

//   useEffect(() => {
//     // Check session from AsyncStorage on app load
//     AsyncStorage.getItem('hasSession').then(value => {
//       setIsLoggedIn(value === 'true');
//     });
//   }, []);

//   if (loading) return null; // or a spinner

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
