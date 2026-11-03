import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/auth";
import api from "@/utils/api";

export function useLogout() {
    const navigate = useNavigate();
    const clearAuth = useAuthStore((state) => state.clearAuth);

    const handleLogout = async () => {
        try {
            // 1. (Opsional tapi disarankan) Beritahu backend untuk mematikan/invalidate token
            // Sesuaikan endpoint-nya dengan API kamu
            await api.post('/auth/logout');
        } catch (error) {
            console.warn("API Logout gagal, tetap lanjutkan hapus data lokal", error);
        } finally {
            // 2. Hapus state di Zustand 
            // Ini otomatis menimpa localStorage (auth-storage) dengan data null yang terenkripsi
            clearAuth();

            // 3. Redirect ke halaman login
            navigate('/login', { replace: true });
        }
    };

    return handleLogout;
}

const authService = {
    async login({ username, password }) {
        return api.post('/auth/login', { username, password })
    },
    async register(data){
        return api.post('/auth/register', data)
    }
}

export default authService;