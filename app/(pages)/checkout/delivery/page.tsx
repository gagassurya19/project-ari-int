"use client"

import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { OrderSummary } from "@/components/checkout/order-summary"
import { ProgressSteps } from "@/components/checkout/progress-steps"
import { useAuthGuard } from "@/lib/authenticate"

export default function DeliveryPage() {
  useAuthGuard()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-xl font-croissant">Versatile</span>
          </Link>
        </div>

        <ProgressSteps currentStep="delivery" />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <OrderSummary/>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Delivery Options</h2>
              <RadioGroup defaultValue="standard">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard 5-7 Business Days</Label>
                  </div>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">2-4 Business Days</Label>
                  </div>
                  <span>Rp 25.000 IDR</span>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/checkout/shipping">Back</Link>
              </Button>
              <Button asChild className="bg-[#0A1172] hover:bg-[#0A1172]/90">
                <Link href="/checkout/payment">Continue</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

