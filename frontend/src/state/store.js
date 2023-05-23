// frontend\src\state\store.js

import { create } from 'zustand';

export const useStore = create(set => ({
    user: null,
    setUser: (user) => set({ user }),
}));