import { Header } from "@/components/header";
import Image from "next/image";

export default function AccountPage() {
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
              src="https://api.dicebear.com/6.x/initials/svg?seed=customer" // Ganti dengan path gambar profil Anda
              alt="Profile Picture"
              className="object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="mt-6 lg:mt-0">
            <h2 className="text-3xl font-bold text-[#0A1172]">Customer</h2>
            <p className="mt-2 text-gray-600">
              Email: customer@customer.com
            </p>
            <p className="text-gray-600">Joined: December 2024</p>

            {/* Edit Profile Button */}
            {/* <button className="mt-4 px-6 py-2 bg-[#FFC107] text-white font-semibold rounded hover:bg-[#e6ac00]">
              Edit Profile
            </button> */}
          </div>
        </div>

        {/* Order History */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-[#0A1172]">Order History</h3>
          <div className="mt-6 bg-white p-6 shadow-md rounded-md">
            <p className="text-gray-600">No orders yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
