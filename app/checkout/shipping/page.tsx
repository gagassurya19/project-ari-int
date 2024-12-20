"use client"

import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { OrderSummary } from "@/components/checkout/order-summary"
import { ProgressSteps } from "@/components/checkout/progress-steps"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-xl font-serif">Versatile</span>
          </Link>
        </div>

        <ProgressSteps currentStep="shipping" />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <OrderSummary showQuantityControls={false} />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input placeholder="Email" type="email" />
              <div className="flex gap-4">
                <Input placeholder="+62" className="w-20" />
                <Input placeholder="Phone Number" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Shipping Details</h2>
              <Input placeholder="Flat/House no." />
              <Input placeholder="Address" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="City" />
                <Input placeholder="State" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Postal Code" />
                <Input placeholder="Famous Landmark" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="same-address" />
                <label htmlFor="same-address" className="text-sm text-gray-600">
                  My shipping and Billing address are the same
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button asChild className="bg-[#0A1172] hover:bg-[#0A1172]/90">
                <Link href="/checkout/delivery">Continue</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

