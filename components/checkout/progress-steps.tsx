import { Check } from 'lucide-react'
import Link from "next/link"

interface ProgressStepsProps {
  currentStep: 'shipping' | 'delivery' | 'payment'
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Link
        href="/checkout/shipping"
        className={`flex items-center gap-2 ${
          currentStep === 'shipping' ? 'text-[#0A1172]' : 'text-gray-500'
        }`}
      >
        {currentStep === 'delivery' || currentStep === 'payment' ? (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0A1172] text-white">
            <Check className="h-4 w-4" />
          </div>
        ) : (
          <span>Shipping</span>
        )}
      </Link>

      <div className="h-px w-12 bg-gray-300" />

      <Link
        href="/checkout/delivery"
        className={`flex items-center gap-2 ${
          currentStep === 'delivery' ? 'text-[#0A1172]' : 'text-gray-500'
        }`}
      >
        {currentStep === 'payment' ? (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0A1172] text-white">
            <Check className="h-4 w-4" />
          </div>
        ) : (
          <span>Delivery</span>
        )}
      </Link>

      <div className="h-px w-12 bg-gray-300" />

      <Link
        href="/checkout/payment"
        className={`flex items-center gap-2 ${
          currentStep === 'payment' ? 'text-[#0A1172]' : 'text-gray-500'
        }`}
      >
        <span>Payment</span>
      </Link>
    </div>
  )
}

