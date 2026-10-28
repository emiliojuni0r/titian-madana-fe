import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { decrypt, encrypt } from './encryption';
// Asumsi kamu punya file utility untuk enkripsi/dekripsi

// 1. Buat Custom Storage Engine
const secureStorage = {
  getItem: (name) => {
    const encryptedData = localStorage.getItem(name);
    if (!encryptedData) return null;
    try {
      return decrypt(encryptedData); // Dekripsi saat data dibaca
    } catch (error) {
      return null;
    }
  },
  setItem: (name, value) => {
    // value di sini adalah string JSON dari seluruh state Zustand
    const encryptedValue = encrypt(value);
    localStorage.setItem(name, encryptedValue); // Enkripsi saat data disimpan
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setAuth: (data) => set({
        token: data.access_token,
        user: {
          role: data.role,
          username: data.username,
          full_name: data.full_name
        }
      }),

      clearAuth: () => {
        set({ token: null, user: null });
        useAuthStore.persist.clearStorage(); // <-- Tambahkan ini untuk menghapus key dari localStorage
      },
      isAuthenticated: () => get().token !== null,
    }),
    {
      name: 'auth-storage',
      // 2. Gunakan Custom Storage di sini
      storage: createJSONStorage(() => secureStorage),
    }
  )
)