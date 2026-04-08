import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FanPage {
  id: string;
  name: string;
  username: string;
  description: string;
  avatar: string;
  cover: string;
  adminId: string;
  category: string;
  followersCount: number;
  isOfficial: boolean;
  createdAt: any;
}

interface FanPageState {
  pages: FanPage[];
  activePageId: string | null;
  setPages: (pages: FanPage[]) => void;
  setActivePage: (id: string | null) => void;
  addPage: (page: FanPage) => void;
  deletePage: (id: string) => void;
}

export const usePageStore = create<FanPageState>()(
  persist(
    (set) => ({
      pages: [],
      activePageId: null,
      setPages: (pages) => set({ pages }),
      setActivePage: (id) => set({ activePageId: id }),
      addPage: (page) => set((state) => ({ pages: [...state.pages, page] })),
      deletePage: (id) => set((state) => ({ pages: state.pages.filter(p => p.id !== id) })),
    }),
    {
      name: 'hubbax-pages-storage',
    }
  )
);
