import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

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

const store = (set) => ({
  user: initialUser,
  setUser: (user: User) => set({ user }),
});

const useUserstore = create<{
  user: User;
  setUser: (user: User) => void;
}>(persist(store, { name: "user" }));

export default useUserstore;
