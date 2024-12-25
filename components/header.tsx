'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { deleteToken, verifyToken } from "@/lib/authenticate"; // Import verifyToken function

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userFromStorage, setUserFromStorage] = useState<any>(null);

  // Check if the user is logged in based on the token from cookies
  useEffect(() => {
    const isTokenValid = verifyToken();
    setIsLoggedIn(isTokenValid);

    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setUserFromStorage(user);
    }
  }, []);

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
                  <Button variant="outline" className="border-cream hover:border-cream/90 hover:bg-cream border-2 bg-transparent text-cream font-semibold md:w-32">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-cream hover:bg-cream/90 text-navy font-semibold md:w-32">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <p className="text-white hidden md:block">
                  Hi, {userFromStorage?.username}
                </p>
                <Link href="/sign-in">
                  <Button className="bg-cream hover:bg-cream/90 text-navy font-semibold md:w-32" onClick={() => {
                    deleteToken()
                  }}>
                    Logout
                  </Button>
                </Link>
                <Link href="/cart" className="text-cream hover:text-cream/80">
                  <ShoppingBag className="h-6 w-6" />
                </Link>
                <Link href="/account" className="text-cream hover:text-cream/80">
                  <User className="h-6 w-6" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
