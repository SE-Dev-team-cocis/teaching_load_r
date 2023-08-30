import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department: string;
  role: string;
};

type UserStore = {
  user: User;
  setUser: (user: User) => void;
};

const useUserstore = create<UserStore>()(
  persist(
    (set) => ({
      user: {} as User,
      setUser: (user: User) => set({ user }),
    }),
    { name: "user" }
  )
);

export default useUserstore;
