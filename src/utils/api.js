import axios from 'axios'
import { useAuthStore } from '../stores/auth' // sesuaikan path
import { router } from '../router' // Import router milikmu

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request Interceptor: Menyelipkan token ke setiap request
api.interceptors.request.use((config) => {
    // Ambil token dari zustand menggunakan getState() karena ini di luar komponen React
    const token = useAuthStore.getState().token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// Response Interceptor: Menangani error global
api.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Jika token tidak valid / expired
        useAuthStore.getState().clearAuth()

        // Redirect ke login menggunakan router bawaan React Router
        router.navigate('/login')
    }
    return Promise.reject(error)
})

export default api