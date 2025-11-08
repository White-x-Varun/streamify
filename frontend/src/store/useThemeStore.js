import { create } from "zustand";
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("layout-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("layout-theme", theme);
    set({ theme });
  },
}));
