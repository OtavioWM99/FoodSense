import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndProfileOnLoad = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // On initial load, check for profile. If it doesn't exist, sign out.
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        if (profileData) {
          setProfile(profileData);
          setSession(session);
        } else {
          await supabase.auth.signOut();
        }
      } 
      setLoading(false);
    };

    fetchSessionAndProfileOnLoad();

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      // On auth change, just set the session and profile. 
      // The creation of the profile is handled in the sign-up screen.
      setSession(session);
      if (session) {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        setProfile(profileData || null);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user: session?.user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
