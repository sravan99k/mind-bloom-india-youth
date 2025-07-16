
import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface ExtendedUser extends User {
  role?: 'student' | 'management';
  demographics?: any;
}

export const useAuth = () => {
  const [user, setUser] = useState<ExtendedUser | null>(() => {
    // Try to get user from session storage on initial load
    if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem('currentUser');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const { toast } = useToast();

  // Fetch session and user
  const fetchSession = useCallback(async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
      setSession(session);
      
      if (session?.user) {
        const role = session.user.user_metadata?.role as 'student' | 'management';
        let demoData = null;
        
        try {
          // Fetch from user_demographics table
          const { data, error: demoError } = await supabase
            .from('user_demographics')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
            
          if (demoError && demoError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            console.error('Error fetching user demographics:', demoError);
            if (initialLoad) {
              toast({
                title: 'Profile Incomplete',
                description: 'Please complete your profile settings.',
                variant: 'default',
              });
            }
          }
          
          demoData = data;
        } catch (demError) {
          console.error('Error in user demographics fetch:', demError);
          // Don't set error state for missing demographics to prevent UI issues
        }
        
        const extendedUser: ExtendedUser = {
          ...session.user,
          role: role,
          demographics: demoData
        };
        // Store user in session storage to persist across page refreshes
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('currentUser', JSON.stringify(extendedUser));
        }
        setUser(extendedUser);
      } else {
        setUser(null);
      }
    } catch (e: any) {
      console.error('Auth error:', e);
      if (initialLoad) {
        toast({
          title: 'Connection Issue',
          description: 'Unable to verify your session. Please check your connection.',
          variant: 'destructive',
        });
      }
      setError(e.message || 'Could not fetch user session.');
    } finally {
      if (initialLoad) {
        setInitialLoad(false);
      }
      setLoading(false);
    }
  }, [initialLoad, toast]);

  // Retry logic
  const retry = useCallback(() => {
    setError(null);
    setTimedOut(false);
    setLoading(true);
    fetchSession();
  }, [fetchSession]);

  // Clear session storage on tab close or page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('currentUser');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Handle auth state changes
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let mounted = true;
    
    const ensureUserRole = async (user: User) => {
      // If user doesn't have a role in metadata, set a default one
      if (!user.user_metadata?.role) {
        try {
          const { data: demographics } = await supabase
            .from('user_demographics')
            .select('role')
            .eq('user_id', user.id)
            .single();
            
          if (demographics?.role) {
            // Update auth user metadata with role
            await supabase.auth.updateUser({
              data: { role: demographics.role }
            });
            return demographics.role;
          }
        } catch (error) {
          console.error('Error ensuring user role:', error);
        }
      }
      return user.user_metadata?.role || 'student'; // Default to student if no role found
    };
    
    const handleAuthChange = async (event: string, newSession: Session | null) => {
      if (!mounted) return;

      // Only show loading for the initial session load, not for subsequent auth state changes
      if (initialLoad) {
        timeout = setTimeout(() => {
          if (!mounted) return;
          setTimedOut(true);
          setLoading(false);
          setError('Loading timed out. Please check your connection and try again.');
          toast({
            title: 'Connection Slow',
            description: 'Taking longer than expected to verify your session.',
            variant: 'default',
          });
        }, 8000);
      }

      // Only update session if it's different to prevent unnecessary re-renders
      setSession(prevSession => {
        if (JSON.stringify(prevSession) !== JSON.stringify(newSession)) {
          return newSession;
        }
        return prevSession;
      });
      
      if (newSession?.user) {
        // Ensure user has a role
        const role = await ensureUserRole(newSession.user) as 'student' | 'management';
        let demoData = null;
        
        try {
          // Fetch from user_demographics table
          const { data, error: demoError } = await supabase
            .from('user_demographics')
            .select('*')
            .eq('user_id', newSession.user.id)
            .single();
            
          if (demoError && demoError.code !== 'PGRST116') {
            console.error('Error in auth change user demographic fetch:', demoError);
          } else {
            demoData = data;
          }
        } catch (demError) {
          console.error('Error in auth change user demographics:', demError);
        }
        
        // Only update user if the data has actually changed
        setUser(prevUser => {
          const newUser: ExtendedUser = {
            ...newSession.user,
            role: role,
            demographics: demoData
          };
          
          if (JSON.stringify(prevUser) !== JSON.stringify(newUser)) {
            // Store user in session storage to persist across page refreshes
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('currentUser', JSON.stringify(newUser));
            }
            return newUser;
          }
          return prevUser;
        });
      } else {
        setUser(null);
      }
      
      if (initialLoad) {
        clearTimeout(timeout);
        setInitialLoad(false);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchSession().catch(console.error);
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session).catch(console.error);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
      clearTimeout(timeout);
    };
  }, [fetchSession, initialLoad, toast]);

  return { user, session, loading, error, retry, timedOut };
};
