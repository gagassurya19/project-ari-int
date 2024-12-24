'use client';

import { Check } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthGuard } from '@/lib/authenticate';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export default function SuccessPage() {
  const router = useRouter();
  const [totalCart, setTotalCart] = useLocalStorageState<string | null>("total_cart", { defaultValue: null });
  
  useAuthGuard();

  const handleBack = () => {
    router.push("/");
    setTotalCart(null); // Clear the value using the setter function from useLocalStorageState
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-semibold mb-2">Payment Success!</h1>
        <p className="text-gray-600 mb-6">Thank you for Shopping</p>
        
        <div className="text-3xl font-bold mb-8">
          IDR {totalCart || 0} {/* Fallback to 0 if totalCart is null */}
        </div>

        <Button className="bg-[#0A1172] hover:bg-[#0A1172]/90 w-full" onClick={handleBack}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}
