// page.tsx
'use client' // Menandakan file ini menggunakan mode "client-side rendering" di Next.js.

// Import Suspense dari React untuk menangani komponen dengan lazy loading.
import { Suspense } from "react";

// Import komponen HomePage, yang akan dirender di dalam halaman ini.
import HomePage from "./home-page";

// Komponen default untuk halaman utama (root) aplikasi.
export default function Page() {
  return (
    // Bungkus komponen HomePage dengan Suspense.
    // Suspense akan menampilkan fallback saat komponen HomePage sedang dimuat.
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <HomePage /> {/* Komponen halaman utama */}
    </Suspense>
  );
}

// Catatan:
// URL http://localhost:3000 -> Mengarah ke file ./app/page.tsx secara default di Next.js.

// Suspense digunakan untuk menangani loading state sementara menunggu komponen atau data.
