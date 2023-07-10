import { create } from "zustand";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department: string;
  role: string;
};

const store = (set, get) => ({
  // user: User
});

export const userStore = create(store);
