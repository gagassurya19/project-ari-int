"use client";

import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { OrderSummary } from "@/components/checkout/order-summary";
import { ProgressSteps } from "@/components/checkout/progress-steps";
import { useAuthGuard } from "@/lib/authenticate";
import { useState, useEffect } from "react";
import { getDeliveryOptions } from "@/lib/api/delivery";
import { useRouter } from "next/navigation";
import useLocalStorageState from 'use-local-storage-state';

export default function DeliveryPage() {
  const router = useRouter();
  useAuthGuard();

  const [deliveryOptions, setDeliveryOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedDelivery, setSelectedDelivery] = useLocalStorageState('delivery_temp', {
    defaultValue: {
      id: "standard",
      cost: 0,
    }
  });

  // Fetch delivery options on mount
  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      try {
        const data = await getDeliveryOptions();
        setDeliveryOptions(data); 
      } catch (error) {
        console.error("Failed to fetch delivery options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryOptions();
  }, []);

  // Handle delivery option change
  const handleDeliveryChange = (value: string) => {
    const selectedOption = deliveryOptions.find((option) => option.id === value);
    if (selectedOption) {
      setSelectedDelivery({ id: value, cost: selectedOption.cost });
    }
  };

  const handleSave = () => {
    if (!selectedDelivery.id) { 
      alert("Please choose an option!");
    } else {
      router.push("/checkout/payment");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <OrderSummary delivery={selectedDelivery.cost} /> 

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Delivery Options</h2>
              <RadioGroup value={selectedDelivery.id} onValueChange={handleDeliveryChange}> 
                {deliveryOptions.map((option) => (
                  <div key={option.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id}>{option.type}</Label>
                    </div>
                    {option.cost === 0 ? (
                      <span className="text-green-500">FREE</span>
                    ) : (
                      <span>Rp {option.cost} IDR</span>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/checkout/shipping">Back</Link>
              </Button>
              <Button className="bg-[#0A1172] hover:bg-[#0A1172]/90" onClick={handleSave}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}