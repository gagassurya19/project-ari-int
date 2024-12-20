import Link from "next/link"
import { ShoppingBag, User } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-[#0A1172] text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-3xl font-serif text-[#F4D03F]">
            Versatile
          </Link>
          
          <div className="hidden md:block flex-1 mx-12">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search product"
                className="w-full bg-white text-black"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-white hover:text-[#F4D03F]">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-[#F4D03F] text-[#0A1172] hover:bg-[#F4D03F]/90">
                Sign Up
              </Button>
            </Link>
            <Link href="/checkout/shipping" className="text-white hover:text-[#F4D03F]">
              <ShoppingBag className="h-6 w-6" />
            </Link>
            <Link href="/account" className="text-white hover:text-[#F4D03F]">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

