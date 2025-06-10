
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface ExtendedUser extends User {
  role?: 'student' | 'management';
  demographics?: any;
}

export const useAuth = () => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }
      
      if (session?.user) {
        await handleUser(session.user, session);
      } else {
        setUser(null);
        setSession(null);
        setLoading(false);
      }
    };

    const handleUser = async (authUser: User, authSession: Session) => {
      try {
        // Get user role from user metadata
        const role = authUser.user_metadata?.role as 'student' | 'management';
        
        // Fetch demographics
        const { data: demoData } = await supabase
          .from('demographics')
          .select('*')
          .eq('user_id', authUser.id)
          .single();

        const extendedUser: ExtendedUser = {
          ...authUser,
          role: role,
          demographics: demoData
        };
        
        setUser(extendedUser);
        setSession(authSession);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser({
          ...authUser,
          role: authUser.user_metadata?.role as 'student' | 'management'
        });
        setSession(authSession);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (session?.user) {
          await handleUser(session.user, session);
        } else {
          setUser(null);
          setSession(null);
          setLoading(false);
        }
      }
    );

    getSession();

    return () => subscription.unsubscribe();
  }, []);

  return { user, session, loading };
};
