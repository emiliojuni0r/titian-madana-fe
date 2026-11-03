import { useState } from "react";
import { SiteHeader } from "@/components/sidebar/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, X } from "lucide-react";
import authService from "../login/authService";

export default function AccountManagement() {
    // State sementara untuk list akun (Karena API get list belum ada)
    const [accounts, setAccounts] = useState([]);

    // State untuk Modal Form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State Form
    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        password: "",
        confirm_password: "",
        role: "marketing"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validate minimum password length
        if (formData.password.length < 8) {
            setError("Password harus memiliki minimal 8 karakter!");
            return;
        }

        // Validate password confirmation length
        if (formData.confirm_password.length < 8) {
            setError("Konfirmasi password harus memiliki minimal 8 karakter!");
            return;
        }


        // Validasi password match
        if (formData.password !== formData.confirm_password) {
            setError("Password dan Konfirmasi Password tidak sama!");
            return;
        }

        setLoading(true);
        try {
            console.log('value of formdata', formData)
            const response = await authService.register(formData);

            // Jika berhasil (201), tambahkan akun baru ke state tabel
            if (response.status === 201) {
                const newAccount = response.data;
                setAccounts((prev) => [newAccount, ...prev]);

                // Tutup modal dan reset form
                setIsModalOpen(false);
                setFormData({
                    full_name: "",
                    username: "",
                    password: "",
                    confirm_password: "",
                    role: "marketing"
                });
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Gagal membuat akun. Silakan coba lagi.");
            console.log("STATUS:", err.response?.status);
            console.log("RESPONSE:", err.response?.data);
            console.log("SENT DATA:", err.config?.data);

            throw error;
        } finally {
            setLoading(false);
        }
    };

    // TODO: Nanti tambahkan useEffect di sini untuk fetch data list akun jika API-nya sudah siap

    return (
        <>
            <SiteHeader breadcrumbs={[{ label: "Pengaturan" }, { label: "Manajemen Akun" }]} />

            <div className="px-3 py-2.5 min-h-screen">
                <div className="rounded-lg bg-stone-100 h-full px-3 py-4">
                    {/* Header Action */}
                    <div className="flex flex-row justify-between items-center mb-4">
                        <h1 className="text-lg md:text-2xl font-bold">Daftar Akun</h1>
                        <Button
                            className="flex gap-x-2 bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={16} /> Buat Akun
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg px-4 py-3 overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Lengkap</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Tanggal Dibuat</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {accounts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                                            Belum ada data. Buat akun baru atau tunggu integrasi API List.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    accounts.map((acc, index) => (
                                        <TableRow key={acc.id || index}>
                                            <TableCell className="font-medium">{acc.full_name}</TableCell>
                                            <TableCell>{acc.username}</TableCell>
                                            <TableCell className="capitalize">{acc.role}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-md text-xs ${acc.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {acc.is_active ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {acc.created_at ? new Date(acc.created_at).toLocaleDateString("id-ID") : "-"}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Modal Form Tambah Akun */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h2 className="text-lg font-bold">Buat Akun Baru</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:bg-gray-100 p-1 rounded-md">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Form) */}
                        <div className="px-6 py-4 overflow-y-auto">
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md border border-red-200">
                                    {error}
                                </div>
                            )}

                            <form id="createAccountForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <Field>
                                    <FieldLabel htmlFor="full_name">Nama Lengkap</FieldLabel>
                                    <Input
                                        id="full_name" name="full_name" type="text" placeholder="Budi Santoso"
                                        value={formData.full_name} onChange={handleChange} required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="username">Username</FieldLabel>
                                    <Input
                                        id="username" name="username" type="text" placeholder="budi123"
                                        value={formData.username} onChange={handleChange} required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="role">Role</FieldLabel>
                                    <NativeSelect id="role" name="role" value={formData.role} onChange={handleChange}>
                                        <NativeSelectOption value="marketing">Marketing</NativeSelectOption>
                                        <NativeSelectOption value="manager">manager</NativeSelectOption>
                                    </NativeSelect>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        id="password" name="password" type="password"
                                        value={formData.password} onChange={handleChange} required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="confirm_password">Konfirmasi Password</FieldLabel>
                                    <Input
                                        id="confirm_password" name="confirm_password" type="password"
                                        value={formData.confirm_password} onChange={handleChange} required
                                    />
                                </Field>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t flex justify-end gap-2 bg-gray-50 rounded-b-lg">
                            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" form="createAccountForm" disabled={loading}>
                                {loading ? "Menyimpan..." : "Simpan Akun"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}