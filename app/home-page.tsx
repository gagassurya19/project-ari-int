// home-page.tsx (create this as a new file in the same directory)
'use client'

// Import hooks bawaan React untuk mengelola state dan efek samping.
import { useState, useEffect } from "react";

// Import Link dari Next.js untuk navigasi antar halaman.
import Link from "next/link"; 

// Import komponen HeaderWithSearch untuk menampilkan header dengan pencarian.
import { HeaderWithSearch } from "@/components/header-with-search";

// Import fungsi getProducts untuk mengambil data produk dari API.
import { getProducts } from "@/lib/api/product";

// Import useSearchParams dari Next.js untuk menangkap parameter dari URL.
import { useSearchParams } from 'next/navigation';

// Import komponen Loading untuk menampilkan indikator loading.
import Loading from "@/components/loading";

// Definisi interface untuk mendeskripsikan struktur data produk.
interface Product {
  id: number;        // ID unik produk
  brand: string;     // Merek produk
  name: string;      // Nama produk
  price: number;     // Harga produk
  image: string;     // URL gambar produk
}

// Komponen utama untuk halaman beranda.
export default function HomePage() {
  // State untuk menyimpan daftar produk.
  const [products, setProducts] = useState<Product[]>([]); 

  // State untuk status loading (boolean).
  const [loading, setLoading] = useState(true);

  // State untuk menyimpan pesan error.
  const [error, setError] = useState("");

  // State untuk menyimpan nilai pencarian dari URL.
  const [search, setSearch] = useState<string>("");

  // Ambil parameter pencarian dari URL menggunakan useSearchParams.
  const searchParams = useSearchParams();

  // useEffect untuk memuat data produk dan menangkap parameter pencarian dari URL.
  useEffect(() => {
    // Ambil nilai parameter 'search' dari URL atau gunakan string kosong jika tidak ada.
    const searchParam = searchParams.get('search') || '';

    // Set nilai parameter 'search' ke state search.
    setSearch(searchParam);

    // Fungsi asinkron untuk mengambil data produk dari API.
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // Panggil fungsi API untuk mengambil produk.
        setProducts(data); // Simpan data produk ke state products.
      } catch (err) {
        setError('Failed to load products'); // Set pesan error jika terjadi masalah.
      } finally {
        setLoading(false); // Set loading menjadi false setelah data diambil.
      }
    };

    fetchProducts(); // Panggil fungsi fetchProducts.
  }, [searchParams]); // Efek akan dipicu ulang jika searchParams berubah.

  // Filter produk berdasarkan nilai pencarian.
  const filteredProducts = products.filter((product) => {
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase())
      : true; // Jika tidak ada nilai pencarian, tampilkan semua produk.
    return matchesSearch;
  });

  // Render komponen loading jika data masih dalam proses diambil.
  if (loading) {
    return <Loading />;
  }

  // Tampilkan pesan error jika ada kesalahan.
  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  // Render halaman utama.
  return (
    <div className="min-h-screen bg-white">

      {/* Bagian header */}
      <HeaderWithSearch />

      {/* Banner */}
      <div className="relative w-full h-auto bg-[#0A1172]">
        <img
          src="/product/banner.png"
          alt="Flower Blossom"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Bagian produk */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            // Tautan ke halaman detail produk.
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform group-hover:-translate-y-1">
                <div className="relative h-72 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{product.brand}</h3>
                <p className="text-gray-600 text-center">{product.name}</p>
                <p className="text-center mt-2 text-lg font-medium">RP {product.price} IDR</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bagian footer */}
      <div className="w-full h-[200px] mt-12 text-left text-black font-semibold bg-[#D9D9D9] flex items-center">
        <div className="container m-5 lg:m-52 text-xl">
          Explore our iconic fragrances, in an array of scents from fresh and flirty to sensual and seductive. Our signature fragrances are
          perfect for gift-giving – for yourself or for her.
        </div>
      </div>
    </div>
  );
}
