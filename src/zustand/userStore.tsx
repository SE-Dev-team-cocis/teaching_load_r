import { create } from "zustand";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department: string;
  role: string;
};

const initialUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  department: "",
  role: "",
};

const useUserstore = create<{
  user: User;
  setUser: (user: User) => void;
}>((set) => ({
  user: initialUser,
  setUser: (user: User) => set({ user }),
}));

export default useUserstore;
