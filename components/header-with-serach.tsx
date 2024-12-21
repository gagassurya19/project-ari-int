import Link from "next/link"
import { ShoppingBag, User, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function HeaderWithSearch() {
    return (
        <header className="bg-navy text-black border-b-2">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="text-3xl font-croissant text-cream">
                        Versatile
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link href="/sign-in">
                            <Button variant="outline" className=" border-cream hover:border-cream/90 hover:bg-cream border-2 bg-transparent text-cream font-semibold w-32">
                                Login
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className="bg-cream hover:bg-cream/90 text-navy font-semibold w-32">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <div></div>
                        
                        <div className="flex-1 mx-12 max-w-3xl">
                            <div className="relative">
                                <Input
                                    type="search"
                                    placeholder="Search product"
                                    className="w-full bg-white text-black pl-10"
                                />
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    size={20} // Ubah ukuran sesuai kebutuhan
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <Link href="/checkout/shipping" className="text-navy hover:text-navy/80">
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
    )
}

