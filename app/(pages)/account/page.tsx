'use client'; // Menandakan bahwa file ini berjalan di client-side rendering.

import { useEffect, useState } from 'react'; // Import hook React untuk state dan efek samping.
import { Header } from "@/components/header"; // Import komponen Header.
import { getTransactions } from "@/lib/api/transaction"; // Import fungsi API untuk mengambil transaksi.
import { useAuthGuard } from '@/lib/authenticate'; // Hook untuk memverifikasi otentikasi pengguna.
import useLocalStorageState from 'use-local-storage-state'; // Hook untuk menyimpan dan mengambil state dari localStorage.
import { Clock, CreditCard, MapPin, Package, ShoppingBag, User } from 'lucide-react'; // Ikon dari lucide-react.
import Loading from '@/components/loading'; // Komponen untuk menampilkan loading state.

export default function AccountPage() {
  // State untuk menyimpan data pengguna dari localStorage.
  const [userFromStorage, setUserFromStorage] = useLocalStorageState<any | null>("user", { defaultValue: null });

  // State untuk menyimpan daftar transaksi pengguna.
  const [transactions, setTransactions] = useState<any[]>([]);

  // State untuk status loading dan pesan error.
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useAuthGuard(); // Mengecek apakah pengguna telah login atau belum.

  // useEffect untuk mengambil data transaksi berdasarkan user ID.
  useEffect(() => {
    if (userFromStorage?.id) {
      getTransactions(userFromStorage.id) // Memanggil API untuk mengambil transaksi.
        .then(data => {
          setTransactions(data); // Menyimpan data transaksi ke state.
          setLoading(false); // Mengubah status loading.
        })
        .catch(err => {
          setError('Failed to load transactions'); // Menyimpan pesan error jika terjadi kegagalan.
          setLoading(false);
        });
    } else {
      setError('Tidak ada transaksi'); // Jika tidak ada pengguna yang login.
      setLoading(false);
    }
  }, [userFromStorage]); // Dependency array untuk mendeteksi perubahan userFromStorage.

  // Jika masih dalam state loading, tampilkan komponen Loading.
  if (loading) {
    return <Loading />;
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
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${userFromStorage.username}`} // Menampilkan avatar pengguna berdasarkan username.
              alt="Profile Picture"
              className="object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="mt-6 lg:mt-0">
            <h2 className="text-3xl font-bold text-[#0A1172]">Customer</h2>
            <p className="mt-2 text-gray-600">Username: {userFromStorage.username}</p>
            <p className="text-gray-600">Joined: {userFromStorage.createdAt}</p>
          </div>
        </div>

        {/* Order History Section */}
        <div className="mx-auto px-4 mt-12">
          <h3 className="text-3xl font-bold text-blue-900 mb-6">Order History</h3>

          {/* Jika tidak ada transaksi */}
          {transactions.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-600">No orders yet.</p>
            </div>
          ) : (
            // Jika ada transaksi
            <div className="space-y-6">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Informasi transaksi */}
                  <div className="bg-blue-50 p-4 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Transaction ID</p>
                        <p className="font-medium text-blue-900">{transaction.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium text-blue-900">{transaction.createdAt}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Daftar Produk */}
                    <div className="flex items-start gap-4">
                      <ShoppingBag className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="w-full">
                        <h4 className="font-medium text-gray-900 mb-4">Products</h4>
                        <div className="grid gap-4">
                          {transaction.cart.items.map((item: any) => (
                            <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                              <img
                                src={item.product.image} // Gambar produk.
                                alt={item.product.name}
                                className="w-20 h-20 object-cover rounded-md"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{item.product.brand}</p>
                                <p className="text-gray-600">{item.product.name}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="font-medium text-blue-600">
                                  {item.product.price * item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Detail Pengguna */}
                    <div className="flex items-start gap-4">
                      <User className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                        <p className="text-gray-600">{transaction.user.username}</p>
                      </div>
                    </div>

                    {/* Detail Pengiriman */}
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                        <p className="text-gray-600">
                          {transaction.shippingAddress.firstName} {transaction.shippingAddress.lastName}
                        </p>
                        <p className="text-gray-600">
                          {transaction.shippingAddress.addressLine1}, {transaction.shippingAddress.city}
                        </p>
                        <p className="text-gray-600">{transaction.shippingAddress.phone}</p>
                      </div>
                    </div>

                    {/* Detail Pengiriman */}
                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Delivery Details</h4>
                        <p className="text-gray-600">
                          {transaction.deliveryOption.type} ({transaction.deliveryOption.estimatedDays} days)
                        </p>
                        <p className="text-gray-600">Cost: {transaction.deliveryOption.cost}</p>
                      </div>
                    </div>

                    {/* Detail Pembayaran */}
                    <div className="flex items-start gap-4">
                      <CreditCard className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                        <p className="text-gray-600">{transaction.paymentMethod.method}</p>
                        {transaction.paymentMethod.cardNumber && (
                          <p className="text-gray-600">
                            Card: **** {transaction.paymentMethod.cardNumber.slice(-4)}
                          </p>
                        )}
                        <p className="text-gray-600">Status: {transaction.paymentMethod.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
