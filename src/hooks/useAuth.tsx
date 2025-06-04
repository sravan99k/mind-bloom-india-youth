
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Get user role from user metadata
          const role = session.user.user_metadata?.role as 'student' | 'management';
          
          // Fetch demographics
          const { data: demoData } = await supabase
            .from('demographics')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          const extendedUser: ExtendedUser = {
            ...session.user,
            role: role,
            demographics: demoData
          };
          
          setUser(extendedUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        // Get user role from user metadata
        const role = session.user.user_metadata?.role as 'student' | 'management';
        
        // Fetch demographics
        const { data: demoData } = await supabase
          .from('demographics')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        const extendedUser: ExtendedUser = {
          ...session.user,
          role: role,
          demographics: demoData
        };
        
        setUser(extendedUser);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, session, loading };
};
