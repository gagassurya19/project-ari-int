import { useEffect, useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { getUserFromLocalStorage } from "@/lib/authenticate"
import { getCart, removeFromCart, updateCartItem } from "@/lib/api/cart"

export function OrderSummary() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch cart items when the component mounts
  useEffect(() => {
      const fetchCart = async () => {
          try {
              const user = getUserFromLocalStorage();
              if (!user.id) throw new Error("User ID is missing");
              const userId = user.id;
              const cartData = await getCart(userId)
              // Ensure cartData is an array before setting it to state
              if (Array.isArray(cartData.items)) {
                  setCartItems(cartData.items)
              } else {
                  setCartItems([]); // Handle case when data is not an array
              }
          } catch (error) {
              console.error("Failed to fetch cart:", error)
              setCartItems([]); // Set empty array on error
          } finally {
              setLoading(false)
          }
      }
      fetchCart()
  }, [])

  const updateQuantity = async (cartItemId: number, increment: number) => {
    try {
        // Kirim request untuk memperbarui kuantitas item
        const updatedItem = await updateCartItem(cartItemId, increment);

        // Pastikan response memiliki data yang valid
        if (updatedItem && updatedItem.id) {
            // Update state dengan data yang baru
            setCartItems((items) =>
                items.map((item) =>
                    item.id === updatedItem.id
                        ? { ...item, quantity: updatedItem.quantity } // Mengupdate quantity saja
                        : item
                )
            );
        } else {
            console.error("Invalid response for updated item:", updatedItem);
        }
    } catch (error) {
        console.error("Failed to update cart item:", error);
    }
  }
  
  const deleteItem = async (cartItemId: number) => {
      try {
          await removeFromCart(cartItemId)
          setCartItems(items => items.filter(item => item.id !== cartItemId))
      } catch (error) {
          console.error('Failed to remove item from cart:', error)
      }
  }
  
  const subtotal = cartItems.length > 0
      ? cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      : 0;
  const shipping = subtotal == 0 ? 0 : 15000
  const tax = subtotal == 0 ? 0 : subtotal * 0.065
  const total = subtotal + shipping + tax
  
  if (loading) {
      return <div>Loading...</div>
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.product.image}
              alt={item.product.name}
              width={80}
              height={80}
              className="object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">Rp {item.product.price} IDR</p>
                </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, (item.quantity < 1 ? 1 : item.quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, (item.quantity + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-black" />
                    </Button>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Input placeholder="Gift Card / Discount code" />
        <Button variant="outline">Apply</Button>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>Rp {subtotal} IDR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Sales tax (6.5%)</span>
          <span>Rp {tax} IDR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping Fee</span>
          <span className="text-green-500">FREE</span>
        </div>
        <Separator />
        <div className="flex justify-between font-medium">
          <span>Total due</span>
          <span>Rp {total} IDR</span>
        </div>
      </div>
    </div>
  )
}
