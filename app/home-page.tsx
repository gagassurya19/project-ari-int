// home-page.tsx (create this as a new file in the same directory)
'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { HeaderWithSearch } from "@/components/header-with-search";
import { getProducts } from "@/lib/api/product";
import { useSearchParams } from 'next/navigation';
import Loading from "@/components/loading";

interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  image: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState<string>("");
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchParam = searchParams.get('search') || '';
    setSearch(searchParam);

    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesSearch;
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderWithSearch />

      <div className="relative w-full h-auto bg-[#0A1172]">
        <img
          src="/product/banner.png"
          alt="Flower Blossom"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
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

      <div className="w-full h-[200px] mt-12 text-left text-black font-semibold bg-[#D9D9D9] flex items-center">
        <div className="container m-5 lg:m-52 text-xl">
          Explore our iconic fragrances, in an array of scents from fresh and flirty to sensual and seductive. Our signature fragrances are
          perfect for gift-giving – for yourself or for her.
        </div>
      </div>
    </div>
  );
}