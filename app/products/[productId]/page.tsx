"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Minus, Plus, Star } from 'lucide-react'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

const product = {
  id: 2,
  brand: "TOM FORD",
  name: "Noir De Noir",
  price: "2,550,000",
  rating: 4.9,
  image: "/product/tom-ford-noir.png",
  description: "The new feminine fragrance from TOM FORD, Noir De Noir is an invitation to broaden your horizons and live meaningful encounters around the world. The elegant floral scent encapsulates emotions, experiences and encounters. I AM WHAT I LIVE.",
  gallery: [
    "/product/creed-white.png",
    "/product/creed-aventus.png",
    "/product/jo-malone-velvet.png",
    "/product/creed-jardin.png",
    "/product/guerlain-shalimar.png"
  ]
}

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const route = useRouter();
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="relative h-[600px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="grid grid-cols-5 gap-4">
              {product.gallery.map((image, index) => (
                <div key={index} className="relative h-24 border rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt="Gallery image"
                    fill
                    className="object-contain"
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
              {[...Array(5)].map((_, i) => (
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
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button className="w-full bg-[#0A1172] hover:bg-[#0A1172]/90 text-white"
            onClick={() => route.push("/checkout/shipping")}>
              Continue
            </Button>

            <div>
              <h3 className="text-xl font-semibold mb-2">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

