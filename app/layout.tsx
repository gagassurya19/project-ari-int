// Import Metadata type dari Next.js untuk mendefinisikan metadata halaman.
import type { Metadata } from "next";

// Import fungsi localFont dari Next.js untuk memuat font lokal.
import localFont from "next/font/local";

// Import stylesheet global untuk seluruh aplikasi.
import "./globals.css";

// Memuat font lokal "GeistSans" dengan properti konfigurasi.
const geistSans = localFont({
  src: "./fonts/GeistVF.woff", // Lokasi file font.
  variable: "--font-geist-sans", // Nama variabel CSS untuk font ini.
  weight: "100 900", // Rentang berat font yang didukung.
});

// Memuat font lokal "GeistMono" dengan properti konfigurasi.
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff", // Lokasi file font.
  variable: "--font-geist-mono", // Nama variabel CSS untuk font ini.
  weight: "100 900", // Rentang berat font yang didukung.
});

// Metadata halaman, digunakan oleh Next.js untuk memberikan informasi tentang halaman.
export const metadata: Metadata = {
  title: "Project IPPL", // Judul halaman.
  description: "Ari intl project", // Deskripsi halaman.
};

// Komponen RootLayout untuk membungkus seluruh aplikasi.
export default function RootLayout({
  children, // Properti children untuk me-render komponen anak.
}: Readonly<{
  children: React.ReactNode; // Tipe properti children, yaitu ReactNode.
}>) {
  return (
    <html lang="en"> {/* Elemen HTML utama dengan atribut bahasa */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Menambahkan kelas font dan antialiasing ke elemen body.
      >
        {children} {/* Render komponen anak di dalam layout */}
      </body>
    </html>
  );
}
