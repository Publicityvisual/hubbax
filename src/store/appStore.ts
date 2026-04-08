import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  userProfile: any | null;
  setUserProfile: (profile: any) => void;
  clearProfile: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
      userProfile: null,
      setUserProfile: (profile) => set({ userProfile: profile }),
      clearProfile: () => set({ userProfile: null }),
    }),
    {
      name: 'hubbax-storage',
    }
  )
);
