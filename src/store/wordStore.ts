import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WordStore {
  currentWord: string;
  setCurrentWord: (word: string) => void;
  searchHistory: string[];
  addToHistory: (word: string) => void;
}

export const useWordStore = create(
  persist<WordStore>((set) => ({
    currentWord: "",
    setCurrentWord: (word) => set({ currentWord: word }),
    searchHistory: [],
    addToHistory: (word) =>
      set((state) => ({
        searchHistory: [word, ...state.searchHistory.filter(w => w !== word)],
      })),
  }), { name: "word-storage" })
);
