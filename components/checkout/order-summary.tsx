import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface Item {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export function OrderSummary() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "TOM FORD", price: 2550000, quantity: 1, image: "/product/tom-ford-noir.png" },
    { id: 2, name: "CREED", price: 9850000, quantity: 1, image: "/product/creed-white.png" },
  ])

  const updateQuantity = (id: number, increment: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.065
  const total = subtotal + tax

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">Rp {item.price.toLocaleString()} IDR</p>
                </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, false)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(item.id)}
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
          <span>Rp {subtotal.toLocaleString()} IDR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Sales tax (6.5%)</span>
          <span>Rp {tax.toLocaleString()} IDR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping Fee</span>
          <span className="text-green-500">FREE</span>
        </div>
        <Separator />
        <div className="flex justify-between font-medium">
          <span>Total due</span>
          <span>Rp {total.toLocaleString()} IDR</span>
        </div>
      </div>
    </div>
  )
}
