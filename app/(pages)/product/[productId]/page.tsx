'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Minus, Plus, Star } from 'lucide-react';
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getProductDetail } from "@/lib/api/product";
import { addToCart } from "@/lib/api/cart";

export default function ProductDetail() {
  const { productId } = useParams(); // Get productId from URL
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const userId = 1; // Replace with dynamic userId if available

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const data = await getProductDetail(Number(productId));
          setProduct(data);
          setMainImage(data.image);

          // Reset images state each time a new product is fetched
          const allImages = [data.image, ...data.gallery.map((item: any) => item.imageUrl)];
          setImages(allImages); // Add main image and gallery images

        } catch (error) {
          console.error("Failed to fetch product:", error);
        }
      };

      fetchProduct();
    }
  }, [productId]); // Re-run when productId changes

  const handleGalleryClick = (image: string) => {
    setMainImage(image); // Change the main image when a gallery image is clicked
  };

  const handleAddToCart = async () => {
    try {
      const response = await addToCart(userId, Number(productId), quantity);
      console.log('Item added to cart:', response);

      // Redirect to shipping page after successful addition
      router.push('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {/* Main Product Image */}
            <div className="relative h-[600px]">
              <img
                src={mainImage || "/placeholder.png"}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Gallery Images */}
            <div className="grid grid-cols-5 gap-4">
              {images.filter(Boolean).map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative h-24 border rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleGalleryClick(image)}
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

            <Button
              className="w-full bg-[#0A1172] hover:bg-[#0A1172]/90 text-white"
              onClick={handleAddToCart}
            >
              Add to Cart & Continue
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
  );
}
