
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@supabase/supabase-js';

export type UserRole = 'student' | 'supervisor' | 'coordinator' | null;

// Check for environment variables with Next.js and Vite naming conventions
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client only if URL and key are available
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  paymentStatus?: 'pending' | 'verified' | 'rejected';
  studentId?: string; // For students
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  supabaseUser: any;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  setSupabaseUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      supabaseUser: null,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: async () => {
        if (supabase) {
          await supabase.auth.signOut();
        }
        set({ user: null, isAuthenticated: false, supabaseUser: null });
      },
      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null,
      })),
      setSupabaseUser: (supabaseUser) => set({ supabaseUser }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Add a listener for auth changes if Supabase client exists
if (supabase) {
  supabase.auth.onAuthStateChange((event, session) => {
    const authStore = useAuthStore.getState();
    
    if (event === 'SIGNED_IN' && session?.user) {
      // Get user profile from database
      supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
        .then(({ data, error }) => {
          if (!error && data) {
            // Set both the supabase user and our custom user object
            authStore.setSupabaseUser(session.user);
            authStore.login({
              id: data.id,
              name: data.name,
              email: data.email,
              role: data.role as UserRole,
              organizationId: data.organization_id,
              paymentStatus: data.payment_status,
              studentId: data.student_id,
            });
          } else {
            console.error('Error fetching user profile:', error);
          }
        });
    } else if (event === 'SIGNED_OUT') {
      authStore.logout();
    }
  });
}
