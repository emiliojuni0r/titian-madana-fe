import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null, // Mengganti 'admin' menjadi 'user' object untuk menyimpan role, dll

      // Fungsi untuk menyimpan data saat login sukses
      setAuth: (data) => set({ 
        token: data.access_token, 
        user: {
            role: data.role,
            username: data.username,
            full_name: data.full_name
        } 
      }),

      // Fungsi untuk menghapus data saat logout
      clearAuth: () => set({ token: null, user: null }),

      // Getter untuk mengecek apakah user sudah login
      isAuthenticated: () => get().token !== null,
    }),
    {
      name: 'auth-storage',
    }
  )
)