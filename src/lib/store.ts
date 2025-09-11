"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

export interface AppState {
  showSideNav: boolean;
  navBackground: boolean;
  activeSection: string;
  isLoading: boolean;
  theme: Theme;
}

interface AppStore extends AppState {
  setShowSideNav: (show: boolean) => void;
  toggleSideNav: () => void;
  setNavBackground: (background: boolean) => void;
  setActiveSection: (section: string) => void;
  setLoading: (loading: boolean) => void;
  setTheme: (theme: Theme) => void;
  reset: () => void;
}

const initialState: AppState = {
  showSideNav: false,
  navBackground: false,
  activeSection: "landing",
  isLoading: false,
  theme: "system",
};

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set, _get) => ({
        ...initialState,

        setShowSideNav: show => set({ showSideNav: show }),

        toggleSideNav: () =>
          set(state => ({ showSideNav: !state.showSideNav })),

        setNavBackground: background => set({ navBackground: background }),

        setActiveSection: section => set({ activeSection: section }),

        setLoading: loading => set({ isLoading: loading }),

        setTheme: theme => set({ theme }),

        reset: () => set(initialState),
      }),
      {
        name: "austindest-store",
        partialize: state => ({
          theme: state.theme,
          activeSection: state.activeSection,
        }),
      }
    ),
    {
      name: "austindest-store",
    }
  )
);
