import { useAuthStore } from "@/stores/auth";
import { Navigate, Outlet } from "react-router";


const ProtectedRoute = () => {
    // Gunakan hook Zustand di dalam komponen
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

    // Jika belum login, tendang ke halaman login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Jika sudah login, render halaman / child routes yang dituju (menggunakan Outlet)
    return <Outlet />;
};

export default ProtectedRoute;