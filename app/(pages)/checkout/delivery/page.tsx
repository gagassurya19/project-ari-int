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
import { getDeliveryOptions } from "@/lib/api/delivery"; // Import the function to fetch delivery options
import { useRouter } from "next/navigation";

export default function DeliveryPage() {
  const router = useRouter();
  useAuthGuard();
  const [selectedDelivery, setSelectedDelivery] = useState<string>("standard");
  const [selectedDeliveryCost, setSelectedDeliveryCost] = useState<number>(0); // Add state to hold the cost
  const [deliveryOptions, setDeliveryOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch delivery options on mount
  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      try {
        const data = await getDeliveryOptions();
        setDeliveryOptions(data); // Set fetched delivery options
        const storedDelivery = localStorage.getItem("delivery_temp");
        if (storedDelivery) {
          const { id, cost } = JSON.parse(storedDelivery);
          setSelectedDelivery(id || "standard"); // Set the selected delivery option from localStorage if exists
          setSelectedDeliveryCost(cost || 0); // Set the delivery cost from localStorage
        }
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
      setSelectedDelivery(value);
      setSelectedDeliveryCost(selectedOption.cost);
      // Store selected delivery option and its cost in localStorage
      localStorage.setItem("delivery_temp", JSON.stringify({ id: value, cost: selectedOption.cost }));
    }
  };

  const handleSave = () => {
    const deliveryCheck = localStorage.getItem("delivery_temp")
    if (!deliveryCheck) {
      alert("Please choose the option!")
    } else {
      router.push("/checkout/payment")
    }
  }

  if (loading) {
    return <div>Loading...</div>; // Show loading state
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
          <OrderSummary delivery={selectedDeliveryCost} /> {/* Pass the delivery cost to OrderSummary */}

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Delivery Options</h2>
              <RadioGroup value={selectedDelivery} onValueChange={handleDeliveryChange}>
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
