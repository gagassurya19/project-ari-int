"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OrderSummary } from "@/components/checkout/order-summary"
import { ProgressSteps } from "@/components/checkout/progress-steps"

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-xl font-croissant">Versatile</span>
          </Link>
        </div>

        <ProgressSteps currentStep="payment" />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <OrderSummary/>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Payment Methods</h2>
              
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">Credit/Debit Cards</span>
                  <div className="flex gap-2">
                    <Image src="/payment/visa.png" alt="Visa" width={32} height={20} />
                    <Image src="/payment/master.png" alt="Mastercard" width={32} height={20} />
                    <Image src="/payment/american.png" alt="American Express" width={32} height={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">Pay with your Credit / Debit Card</p>
                <div className="space-y-4">
                  <Input placeholder="Card number" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM / YY" />
                    <Input placeholder="CVV" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/checkout/delivery">Back</Link>
              </Button>
              <Button asChild className="bg-[#0A1172] hover:bg-[#0A1172]/90">
                <Link href="/checkout/success">Pay $164.23</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

