"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderSummary } from "@/components/checkout/order-summary";
import { ProgressSteps } from "@/components/checkout/progress-steps";
import { useAuthGuard } from "@/lib/authenticate";
import { createPaymentMethod } from "@/lib/api/payment";
import { createTransaction } from "@/lib/api/transaction";

export default function PaymentPage() {
  useAuthGuard()
  const [formData, setFormData] = useState({
    method: "CreditCard", // Fixed to "CreditCard"
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (!formData.cardNumber || !formData.expiry || !formData.cvv) {
      alert("Please fill out all required fields.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    // Utility function to fetch and parse localStorage items
    const getLocalStorageItem = (key: string) => {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
      return null;
    };
  
    try {
      // Get address, delivery, user, and cart data from localStorage
      const idUser = getLocalStorageItem("user")?.id;
      const idAddress = getLocalStorageItem("shipping_temp")?.id;
      const idDelivery = getLocalStorageItem("delivery_temp")?.id;
      const idCart = getLocalStorageItem("cart_id");
  
      // Validate if all required data is available
      if (!idUser) {
        alert("Please check your user information.");
        return;
      }
      if (!idAddress) {
        alert("Please check your shipping address.");
        return;
      }
      if (!idDelivery) {
        alert("Please check your delivery details.");
        return;
      }
      if (!idCart) {
        alert("Please check your cart.");
        return;
      }

      // Submit payment method to the backend
      const newPayment = await createPaymentMethod(formData);
      const idPayment = newPayment.id;
  
      // Create transaction payload
      const transactionPayload = {
        userId: idUser,
        cartId: idCart,
        shippingId: idAddress,
        deliveryId: idDelivery,
        paymentId: idPayment,
      };
  
      // Call the createTransaction function and await the result
      await createTransaction(transactionPayload);
  
      // Optionally, clear specific localStorage items after successful transaction
      localStorage.removeItem("shipping_temp");
      localStorage.removeItem("delivery_temp");
      localStorage.removeItem("cart_id");
  
      // Redirect to success page
      window.location.href = "/checkout/success";
    } catch (error) {
      console.error("Error in payment submission:", error);
      setError("Failed to create payment method. Please try again.");
    } finally {
      setLoading(false);
    }
  };  

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
          <OrderSummary />

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Payment Method</h2>

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
                  <Input
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="MM / YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    />
                    <Input
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/checkout/delivery">Back</Link>
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#0A1172] hover:bg-[#0A1172]/90"
              >
                {loading ? 'Paying...' : 'Pay'}
              </Button>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
