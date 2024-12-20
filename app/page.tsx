import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

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
      <Header />
      
      <div className="relative h-[400px] bg-[#0A1172]">
  <Image
    src="/product/banner.png"
    alt="Flower Blossom"
    fill
    className="object-cover opacity-80"
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
    <h1 className="text-6xl font-serif mb-4 relative">
      <span className="bg-black/50 px-4 py-1 rounded-md">
        FLOWER BLOSSOM
      </span>
    </h1>
    <p className="text-xl max-w-2xl relative">
      <span className="bg-black/50 px-3 py-1 rounded-md">
        Step into a world where the essence of spring blooms awaits, ready to captivate your senses.
      </span>
    </p>
  </div>
</div>


      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter By</h2>
          <div className="flex gap-4">
            <Button variant="outline">Men fragrance</Button>
            <Button variant="outline">Women fragrance</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <div className="mt-12 text-center text-gray-600">
          Explore our iconic fragrances, in an array of scents from fresh and flirty to sensual and seductive. 
          Our signature fragrances are perfect for gift-giving – for yourself or for her.
        </div>
      </div>
    </div>
  )
}

