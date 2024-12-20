import Image from "next/image"
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface OrderSummaryProps {
  showQuantityControls?: boolean
}

export function OrderSummary({ showQuantityControls = true }: OrderSummaryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <Image
            src="/product/tom-ford-noir.png"
            alt="TOM FORD"
            width={80}
            height={80}
            className="object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">TOM FORD</h3>
                <p className="text-sm text-gray-600">Rp 2.550.000 IDR</p>
              </div>
              {showQuantityControls ? (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">1</span>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>1</span>
                  <Trash2 className="h-4 w-4 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Image
            src="/product/creed-white.png"
            alt="CREED"
            width={80}
            height={80}
            className="object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">CREED</h3>
                <p className="text-sm text-gray-600">Rp 9.850.000 IDR</p>
              </div>
              {showQuantityControls ? (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">1</span>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>1</span>
                  <Trash2 className="h-4 w-4 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Input placeholder="Gift Card / Discount code" />
        <Button variant="outline">Apply</Button>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>Rp 12.400.000 IDR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Sales tax (6.5%)</span>
          <span>Rp 50.000 IDR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping Fee</span>
          <span className="text-green-500">FREE</span>
        </div>
        <Separator />
        <div className="flex justify-between font-medium">
          <span>Total due</span>
          <span>Rp 12.450.000 IDR</span>
        </div>
      </div>
    </div>
  )
}

