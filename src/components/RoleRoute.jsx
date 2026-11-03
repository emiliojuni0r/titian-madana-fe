import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/stores/auth"; // Sesuaikan path

const RoleRoute = ({ allowedRoles }) => {
    // Ambil data user dari Zustand
    const user = useAuthStore((state) => state.user);

    // Jika user tidak ada atau rolenya tidak termasuk dalam allowedRoles, tendang ke halaman utama
    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    // Jika sesuai, render halaman yang dituju
    return <Outlet />;
};

export default RoleRoute;