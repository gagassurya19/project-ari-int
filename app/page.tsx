import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeaderWithSearch } from "@/components/header-with-serach"

const products = [
  {
    id: 1,
    brand: "CREED",
    name: "Aventus for her",
    price: "6,050,000",
    image: "/product/creed-aventus.png"
  },
  {
    id: 2,
    brand: "TOM FORD",
    name: "Noir de noir",
    price: "2,550,000",
    image: "/product/tom-ford-noir.png"
  },
  {
    id: 3,
    brand: "JO MALONE",
    name: "Velvet rose & oud",
    price: "3,550,000",
    image: "/product/jo-malone-velvet.png"
  },
  {
    id: 4,
    brand: "CREED",
    name: "White flowers",
    price: "9,850,000",
    image: "/product/creed-white.png"
  },
  {
    id: 5,
    brand: "CREED",
    name: "Jardin D'amalfi",
    price: "9,950,000",
    image: "/product/creed-jardin.png"
  },
  {
    id: 6,
    brand: "GUERLAIN",
    name: "Shalimar",
    price: "47,546,000",
    image: "/product/guerlain-shalimar.png"
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderWithSearch />

      <div className="relative w-full h-auto bg-[#0A1172]">
        <Image
          src="/product/banner.png"
          alt="Flower Blossom"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform group-hover:-translate-y-1">
                <div className="relative h-64 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-center">{product.brand}</h3>
                <p className="text-gray-600 text-center">{product.name}</p>
                <p className="text-center mt-2">RP {product.price} IDR</p>
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
  )
}

