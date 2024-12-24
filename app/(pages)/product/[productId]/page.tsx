// @app/(pages)/product/[productId]
'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Minus, Plus, Star } from 'lucide-react';
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getProductDetail } from "@/lib/api/product";
import { createCart, addToCart } from "@/lib/api/cart";
import { getUserFromLocalStorage } from "@/lib/authenticate";

export default function ProductDetail() {
  const { productId } = useParams(); // Get productId from URL
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

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
      const user = getUserFromLocalStorage();
      if (!user.id) throw new Error("User ID is missing");
      const userId = user.id;
  
      // Check if cart_id exists in localStorage
      let cartId = localStorage.getItem("cart_id");
  
      if (!cartId) {
        // If no cart_id, create a new cart
        const createCartResponse = await createCart(userId, Number(productId), quantity); // Assuming createCart is a function that creates a cart
        cartId = createCartResponse.id; // Get the cartId from the response
        localStorage.setItem("cart_id", cartId || ""); // Store cartId in localStorage
      } else {
        // Add the item to the cart using the cartId
        const response = await addToCart(userId, Number(productId), quantity, parseInt(cartId || "0"));  
      }
  
      // Redirect to cart page after successful addition
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
