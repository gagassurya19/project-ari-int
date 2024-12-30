'use client' // Menandakan bahwa komponen ini berjalan di sisi klien (browser) pada Next.js

import Link from "next/link" // Mengimpor komponen Link dari Next.js untuk navigasi antar halaman
import Image from "next/image" // Mengimpor komponen Image dari Next.js untuk menampilkan gambar dengan optimasi
import { Input } from "@/components/ui/input" // Mengimpor komponen Input
import { Button } from "@/components/ui/button" // Mengimpor komponen Button
import { Checkbox } from "@/components/ui/checkbox" // Mengimpor komponen Checkbox (di-comment)
import { useState } from "react" // Mengimpor hook useState dari React untuk mengelola state
import { signIn } from "@/lib/api/auth" // Mengimpor fungsi signIn untuk menangani proses login
import { useRouter } from "next/navigation" // Mengimpor hook useRouter dari Next.js untuk navigasi
import Cookies from "js-cookie"; // Mengimpor library js-cookie untuk mengelola cookies

export default function SignInPage() {
    const route = useRouter() // Inisialisasi hook router untuk navigasi halaman
    
    const [username, setUsername] = useState("") // State untuk menyimpan nilai username
    const [password, setPassword] = useState("") // State untuk menyimpan nilai password
    const [error, setError] = useState("") // State untuk menyimpan pesan error jika login gagal

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault() // Mencegah reload halaman saat form disubmit

        try {
            // Memanggil fungsi signIn dengan username dan password yang diisi
            const response = await signIn(username, password)
            // Menyimpan token di cookies dan user di localStorage
            Cookies.set("token", response.token, { expires: 7, secure: true, path: "/" });
            localStorage.setItem("user", JSON.stringify(response.user))

            // Setelah login berhasil, arahkan pengguna ke halaman utama
            route.push('/')
        } catch (error: any) {
            console.error("Error signing in:", error) // Menampilkan error di console jika login gagal
            setError("Invalid username or password. Please try again.") // Menampilkan pesan error di UI
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex w-full lg:w-1/2 flex-col px-8 py-12 lg:px-12">
                {/* Gambar dekorasi kiri atas */}
                <div className="absolute left-0 top-0">
                    <Image
                        src="/sign/pojokkiriatas-inup.svg"
                        alt="Decorative squares"
                        width={100}
                        height={100}
                    />
                </div>

                <div className="mx-auto w-full max-w-md">
                    <h1 className="text-4xl font-bold">Sign In</h1> {/* Judul halaman */}
                    <p className="mt-4 text-xl text-gray-600">
                        Hello again! Immerse yourself in the world of luxury scents {/* Deskripsi singkat */}
                    </p>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {/* Menampilkan pesan error jika login gagal */}
                        {error && (
                            <div className="text-red-500 text-sm mb-4">
                                {error}
                            </div>
                        )}
                        {/* Input untuk username */}
                        <div className="space-y-1">
                            <Input
                                type="text"
                                placeholder="Username"
                                className="h-12 border-2 border-navy-blue rounded-md"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Mengupdate state username
                            />
                        </div>

                        {/* Input untuk password */}
                        <div className="space-y-1">
                            <Input
                                type="password"
                                placeholder="Password"
                                className="h-12 border-2 border-navy-blue rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Mengupdate state password
                            />
                        </div>

                        {/* Checkbox (di-comment) */}
                        {/* <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                By continuing, you agree to{" "}
                                <Link href="/terms" className="text-navy-blue underline">
                                    Terms & Conditions
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-navy-blue underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div> */}

                        {/* Tombol untuk submit form */}
                        <Button
                            type="submit"
                            className="w-full h-12 bg-[#0A1172] hover:bg-[#0A1172]/90"
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Tautan untuk ke halaman pendaftaran */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link href="/sign-up" className="text-navy-blue underline">
                            Sign up
                        </Link>{" "}
                        now
                    </p>
                </div>

                {/* Gambar dekorasi kanan bawah */}
                <div className="absolute bottom-0 left-0">
                    <Image
                        src="/sign/pojokkananbawah-inup.svg"
                        alt="Decorative squares"
                        width={100}
                        height={100}
                    />
                </div>
            </div>

            {/* Gambar latar belakang halaman untuk tampilan desktop */}
            <div className="relative h-screen hidden lg:block lg:w-1/2">
                <Image
                    src="/sign/signin-bg.png"
                    alt="Decorative perfume image"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    )
}
