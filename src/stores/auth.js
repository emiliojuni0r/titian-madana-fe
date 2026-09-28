import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      admin: null,

      // Fungsi untuk menyimpan data saat login sukses
      setAuth: (data) => set({ token: data.token, admin: data.admin }),

      // Fungsi untuk menghapus data saat logout
      clearAuth: () => set({ token: null, admin: null }),

      // Getter untuk mengecek apakah user sudah login
      isAuthenticated: () => get().token !== null,
    }),
    {
      name: 'auth-storage', // Nama key yang akan disimpan di localStorage
    }
  )
)