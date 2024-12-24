'use client';
import { useEffect, useState } from 'react';
import { Header } from "@/components/header";
import { getTransactions } from "@/lib/api/transaction";  
import { getUserFromLocalStorage, useAuthGuard } from '@/lib/authenticate';

export default function AccountPage() {
  const [userFromStorage, setUserFromStorage] = useState<any | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useAuthGuard();

  useEffect(() => {
    // Make sure that localStorage is only accessed in the client-side
    if (typeof window !== "undefined") {
      const storedUser = getUserFromLocalStorage();
      if (storedUser) {
        setUserFromStorage(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    if (userFromStorage?.userId) {
      getTransactions(userFromStorage.userId)
        .then(data => {
          setTransactions(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load transactions');
          setLoading(false);
        });
    } else {
      setError('Tidak ada transaksi');
      setLoading(false);
    }
  }, [userFromStorage]);

  if (!userFromStorage) {
    return <div>Loading...</div>;  // Add a loading state for when userFromStorage is not available yet
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <Header />

      {/* Profile Section */}
      <div className="container mx-auto py-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12">
          {/* Profile Picture */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-300">
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${userFromStorage.username}`} // Ganti dengan path gambar profil Anda
              alt="Profile Picture"
              className="object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="mt-6 lg:mt-0">
            <h2 className="text-3xl font-bold text-[#0A1172]">Customer</h2>
            <p className="mt-2 text-gray-600">
              Username: {userFromStorage.username}
            </p>
            <p className="text-gray-600">
              Joined: {userFromStorage.createdAt}
            </p>
          </div>
        </div>

        {/* Order History */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-[#0A1172]">Order History</h3>
          <div className="mt-6 bg-white p-6 shadow-md rounded-md">
            {loading && <p className="text-gray-600">Loading transactions...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {transactions.length === 0 && !loading && !error && (
              <p className="text-gray-600">No orders yet.</p>
            )}
            {transactions.length > 0 && !loading && !error && (
              <div>
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="mb-4">
                    <h4 className="text-lg font-bold text-gray-800">Transaction ID: {transaction.id}</h4>
                    <p className="text-gray-600">Status: {transaction.status}</p>
                    <p className="text-gray-600">Created At: {transaction.createdAt}</p>

                    {/* User Details */}
                    <div className="mt-2">
                      <h5 className="font-semibold">User:</h5>
                      <p className="text-gray-600">Username: {transaction.user.username}</p>
                      <p className="text-gray-600">Email: {transaction.user.email}</p>
                    </div>

                    {/* Cart Details */}
                    <div className="mt-2">
                      <h5 className="font-semibold">Cart:</h5>
                      <p className="text-gray-600">Cart ID: {transaction.cart.id}</p>
                      <p className="text-gray-600">Total Items: {transaction.cart.items.length}</p>
                    </div>

                    {/* Shipping Address */}
                    <div className="mt-2">
                      <h5 className="font-semibold">Shipping Address:</h5>
                      <p className="text-gray-600">Name: {transaction.shippingAddress.firstName} {transaction.shippingAddress.lastName}</p>
                      <p className="text-gray-600">Address: {transaction.shippingAddress.addressLine1}, {transaction.shippingAddress.city}, {transaction.shippingAddress.state}</p>
                      <p className="text-gray-600">Phone: {transaction.shippingAddress.phone}</p>
                    </div>

                    {/* Delivery Option */}
                    <div className="mt-2">
                      <h5 className="font-semibold">Delivery Option:</h5>
                      <p className="text-gray-600">Type: {transaction.deliveryOption.type}</p>
                      <p className="text-gray-600">Estimated Days: {transaction.deliveryOption.estimatedDays}</p>
                      <p className="text-gray-600">Cost: {transaction.deliveryOption.cost}</p>
                    </div>

                    {/* Payment Method */}
                    <div className="mt-2">
                      <h5 className="font-semibold">Payment Method:</h5>
                      <p className="text-gray-600">Method: {transaction.paymentMethod.method}</p>
                      {transaction.paymentMethod.cardNumber && (
                        <p className="text-gray-600">Card Number: **** **** **** {transaction.paymentMethod.cardNumber.slice(-4)}</p>
                      )}
                      <p className="text-gray-600">Status: {transaction.paymentMethod.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
