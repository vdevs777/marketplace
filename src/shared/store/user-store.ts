import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserInterface } from "../interfaces/user";

interface SetSessionParams {
  user: UserInterface;
  token: string;
  refreshToken: string;
}

interface UpdateTokensParams {
  token: string;
  refreshToken: string;
}

export interface UserStore {
  user: UserInterface | null;
  token: string | null;
  refreshToken: string | null;

  setSession: (sessionData: SetSessionParams) => void;
  updateTokens: (updateTokensData: UpdateTokensParams) => void;
  updateUser: (updatedUserData: Partial<UserInterface>) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist<UserStore>(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,

      logout: () => set({ user: null, token: null, refreshToken: null }),
      setSession: (sessionData) => set({ ...sessionData }),
      updateTokens: (updateTokensData) => set({ ...updateTokensData }),
      updateUser: (updatedUserData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUserData } : null,
        })),
    }),
    {
      name: "marketplace-auth",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
