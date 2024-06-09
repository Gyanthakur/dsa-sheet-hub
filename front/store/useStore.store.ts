import { create } from "zustand";

export const useStore = create((set) => ({
  loggedInUser: null,
  setLoggedInUser: (user: any) => set({ loggedInUser: user }),
}));
