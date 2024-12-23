'use client'
import { Check } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuthGuard } from '@/lib/authenticate'

export default function SuccessPage() {
  useAuthGuard();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-semibold mb-2">Payment Success!</h1>
        <p className="text-gray-600 mb-6">Thank you for Shopping</p>
        
        <div className="text-3xl font-bold mb-8">
          IDR 1,000,000
        </div>

        <Button asChild className="bg-[#0A1172] hover:bg-[#0A1172]/90 w-full">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}

