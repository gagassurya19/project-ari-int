"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderSummary } from "@/components/checkout/order-summary";
import { ProgressSteps } from "@/components/checkout/progress-steps";
import { useAuthGuard } from "@/lib/authenticate";
import { createShippingAddress } from "@/lib/api/shipping";
import { useRouter } from "next/navigation";

export default function ShippingPage() {
  const router = useRouter()
  useAuthGuard();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    landmark: '',
    isBillingSame: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch shipping details from localStorage on initial render
  useEffect(() => {
    const getShippingFromLocalStorage = async () => {
      try {
        const addresses = localStorage.getItem("shipping_temp");
        if (addresses) {
          setFormData(JSON.parse(addresses));
        }
      } catch (error) {
        console.error("Error fetching shipping addresses:", error);
      }
    };

    getShippingFromLocalStorage();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.addressLine1) {
      alert("Please fill out all required fields.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      // Get the current shipping data from localStorage
      const storedData = localStorage.getItem("shipping_temp");
      const previousData = storedData ? JSON.parse(storedData) : null;
  
      // Check if the data has changed
      const isDataChanged = JSON.stringify(previousData) !== JSON.stringify(formData);
  
      if (isDataChanged) {
        // Data has changed, send the new data to the backend
        const response = await createShippingAddress(formData); // API call
        localStorage.setItem("shipping_temp", JSON.stringify(response)); // Save new data to localStorage
      }
  
      // Navigate to the next page
      router.push("/checkout/delivery");
    } catch (error) {
      console.error("Error creating shipping address:", error);
      setError("Failed to create shipping address. Please try again.");
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

        <ProgressSteps currentStep="shipping" />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <OrderSummary />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input 
                  placeholder="First Name" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleInputChange} 
                />
                <Input 
                  placeholder="Last Name" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleInputChange} 
                />
              </div>
              <Input 
                placeholder="Email" 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
              />
              <div className="flex gap-4">
                <Input placeholder="+62" className="w-20" disabled />
                <Input 
                  placeholder="Phone Number" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Shipping Details</h2>
              <Input 
                placeholder="Flat/House no." 
                name="addressLine1" 
                value={formData.addressLine1} 
                onChange={handleInputChange} 
              />
              <Input 
                placeholder="Address" 
                name="addressLine2" 
                value={formData.addressLine2} 
                onChange={handleInputChange} 
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input 
                  placeholder="City" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                />
                <Input 
                  placeholder="State" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input 
                  placeholder="Postal Code" 
                  name="postalCode" 
                  value={formData.postalCode} 
                  onChange={handleInputChange} 
                />
                <Input 
                  placeholder="Famous Landmark" 
                  name="landmark" 
                  value={formData.landmark} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="same-address" 
                  name="sameAddress" 
                  checked={true}
                />
                <label htmlFor="same-address" className="text-sm text-gray-600">
                  My shipping and Billing address are the same
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleSubmit} 
                disabled={loading} 
                className="bg-[#0A1172] hover:bg-[#0A1172]/90"
              >
                {loading ? 'Saving...' : 'Continue'}
              </Button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
