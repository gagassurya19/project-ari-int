'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, User, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from 'next/navigation';  // Import to handle search query
import { deleteToken, verifyToken } from "@/lib/authenticate";

export function HeaderWithSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userFromStorage, setUserFromStorage] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if the token exists in cookies (using verifyToken)
    const isTokenValid = verifyToken();
    setIsLoggedIn(isTokenValid);

    if (typeof window !== 'undefined') {
      // Get user data from localStorage and handle parsing safely
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          setUserFromStorage(JSON.parse(userData));
        } catch (error) {
          console.error("Failed to parse user data:", error);
          setUserFromStorage(null); // Handle error case
        }
      }
    }

    // Set initial search query from URL if available
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Handle input change for search query
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submit and redirect with search query in URL
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`?search=${searchQuery}`);
    }
  };

  return (
    <header className="bg-navy text-black border-b-2">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-3xl font-croissant text-cream">
            Versatile
          </Link>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link href="/sign-in">
                  <Button variant="outline" className="border-cream hover:border-cream/90 hover:bg-cream border-2 bg-transparent text-cream font-semibold w-32">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-cream hover:bg-cream/90 text-navy font-semibold w-32">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <p className="text-white">
                  Hi, {userFromStorage?.username || 'Guest'}
                </p>
                <Link href="/sign-in">
                  <Button className="bg-cream hover:bg-cream/90 text-navy font-semibold w-32" onClick={() => {
                    deleteToken()
                  }}>
                    Logout
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div></div>

            <div className="flex-1 mx-12 max-w-3xl">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search product"
                  className="w-full bg-white text-black pl-10"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20} // Adjust the size as needed
                />
              </form>
            </div>

            <div className="flex items-center gap-8">
              <Link href="/cart" className="text-navy hover:text-navy/80">
                <ShoppingBag className="h-6 w-6" />
              </Link>
              <Link href="/account" className="text-navy hover:text-navy/80">
                <User className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
