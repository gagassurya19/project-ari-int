'use client'; // Menandakan bahwa ini adalah komponen yang berjalan di sisi klien (browser) pada Next.js

import { useEffect, useState } from "react"; // Mengimpor hook useEffect dan useState dari React
import { useParams, useRouter } from "next/navigation"; // Mengimpor hook useParams dan useRouter dari Next.js untuk navigasi dan pengambilan parameter URL
import { Minus, Plus, Star } from 'lucide-react'; // Mengimpor ikon Minus, Plus, dan Star dari lucide-react
import { Header } from "@/components/header"; // Mengimpor komponen Header
import { Button } from "@/components/ui/button"; // Mengimpor komponen Button
import { getProductDetail } from "@/lib/api/product"; // Mengimpor fungsi untuk mengambil detail produk dari API
import { createCart, addToCart, checkCart } from "@/lib/api/cart"; // Mengimpor fungsi untuk menangani keranjang belanja
import useLocalStorageState from "use-local-storage-state"; // Mengimpor hook untuk mengelola state yang disimpan di localStorage
import Loading from "@/components/loading"; // Mengimpor komponen Loading untuk menampilkan status pemuatan

// Mendefinisikan tipe untuk objek user
type User = {
  id: number;
  username: string;
};

export default function ProductDetail() {
  const { productId } = useParams(); // Mengambil productId dari URL
  const router = useRouter(); // Menggunakan hook router untuk navigasi halaman
  const [product, setProduct] = useState<any>(null); // State untuk menyimpan data produk
  const [quantity, setQuantity] = useState(1); // State untuk menyimpan jumlah produk
  const [mainImage, setMainImage] = useState<string | null>(null); // State untuk menyimpan gambar utama produk
  const [images, setImages] = useState<string[]>([]); // State untuk menyimpan gambar galeri produk

  // Menggunakan useLocalStorageState untuk mendapatkan user dan cart_id dari localStorage
  const [userFromStorage, setUserFromStorage] = useLocalStorageState<User | null>("user", { defaultValue: null });
  const [cartId, setCartId] = useLocalStorageState("cart_id", { defaultValue: null });

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const data = await getProductDetail(Number(productId)); // Mengambil detail produk berdasarkan productId
          setProduct(data); // Menyimpan data produk ke state
          setMainImage(data.image); // Menyimpan gambar utama produk

          // Menggabungkan gambar utama dan gambar galeri ke dalam satu array
          const allImages = [data.image, ...data.gallery.map((item: any) => item.imageUrl)];
          setImages(allImages); // Menyimpan semua gambar ke state images
        } catch (error) {
          console.error("Failed to fetch product:", error); // Menangani error jika pengambilan data produk gagal
        }
      };

      fetchProduct(); // Memanggil fungsi fetchProduct untuk mengambil data produk
    }
  }, [productId]); // Menjalankan ulang efek setiap kali productId berubah

  const handleGalleryClick = (image: string) => {
    setMainImage(image); // Mengubah gambar utama ketika gambar galeri diklik
  };

  const handleAddToCart = async () => {
    try {
      if (!userFromStorage?.id) return router.push('/sign-in'); // Jika user tidak terautentikasi, arahkan ke halaman sign-in
      const userId = userFromStorage?.id;

      // Memeriksa apakah cart_id ada di localStorage
      if (!cartId) {
        // Jika cart_id tidak ada, buat keranjang baru
        const createCartResponse = await createCart(userId, Number(productId), quantity); // Membuat keranjang baru
        setCartId(createCartResponse.id); // Menyimpan cartId ke localStorage
      } else {
        const cartCheck = await checkCart(userId, cartId); // Memeriksa apakah cart_id valid
        if (!cartCheck) {
          // Jika cart_id tidak valid, buat keranjang baru
          const createCartResponse = await createCart(userId, Number(productId), quantity);
          setCartId(createCartResponse.id); // Menyimpan cartId ke localStorage
        } else {
          // Menambahkan produk ke keranjang yang sudah ada
          await addToCart(userId, Number(productId), quantity, cartId);
        }
      }

      // Mengarahkan pengguna ke halaman keranjang setelah berhasil menambahkan produk
      router.push('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error); // Menangani error jika gagal menambahkan ke keranjang
    }
  };

  if (!product) {
    return <Loading />; // Menampilkan komponen loading jika produk belum dimuat
  }

  return (
    <div className="min-h-screen bg-white">
      <Header /> {/* Menampilkan Header */}

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {/* Gambar Utama Produk */}
            <div className="relative h-[600px]">
              <img
                src={mainImage || "/placeholder.png"} // Menampilkan gambar utama, jika tidak ada gunakan placeholder
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Gambar Galeri */}
            <div className="grid grid-cols-5 gap-4">
              {images.filter(Boolean).map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative h-24 border rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleGalleryClick(image)} // Mengubah gambar utama saat gambar galeri diklik
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index}`}
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold">{product.brand}</h1>
              <h2 className="text-2xl mt-2">{product.name}</h2>
            </div>

            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => ( // Menampilkan rating bintang
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              <span className="text-gray-600">({product.rating})</span>
            </div>

            <div>
              <h3 className="text-xl">Price :</h3>
              <p className="text-2xl font-bold">Rp {product.price} IDR</p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))} // Mengurangi jumlah produk
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)} // Menambah jumlah produk
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              className="w-full bg-[#0A1172] hover:bg-[#0A1172]/90 text-white"
              onClick={handleAddToCart} // Menambahkan produk ke keranjang
            >
              Add to Cart & Continue
            </Button>

            <div>
              <h3 className="text-xl font-semibold mb-2">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description} {/* Menampilkan deskripsi produk */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
