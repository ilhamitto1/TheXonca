import { create } from "zustand";

type UIState = {
  isMenuOpen: boolean;
  isLoading: boolean;
  hasLoaded: boolean;
  scrollProgress: number;
  cursorLabel: string | null;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
  setLoading: (loading: boolean) => void;
  setHasLoaded: (loaded: boolean) => void;
  setScrollProgress: (value: number) => void;
  setCursorLabel: (label: string | null) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  isLoading: true,
  hasLoaded: false,
  scrollProgress: 0,
  cursorLabel: null,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  setLoading: (loading) => set({ isLoading: loading }),
  setHasLoaded: (loaded) => set({ hasLoaded: loaded }),
  setScrollProgress: (value) => set({ scrollProgress: value }),
  setCursorLabel: (label) => set({ cursorLabel: label }),
}));
