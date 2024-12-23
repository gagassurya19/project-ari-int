"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { useAuthGuard } from "@/lib/authenticate"

interface CartItem {
    id: number
    brand: string
    name: string
    price: number
    quantity: number
    image: string
}

export default function CartPage() {
    useAuthGuard()
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            brand: "CREED",
            name: "Aventus for her",
            price: 2550000,
            quantity: 1,
            image: "/product/creed-aventus.png"
        },
        {
            id: 2,
            brand: "TOM FORD",
            name: "Noir de noir",
            price: 9850000,
            quantity: 1,
            image: "/product/tom-ford-noir.png"
        },
    ])

    const updateQuantity = (id: number, increment: boolean) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
                    : item
            )
        )
    }

    const deleteItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };    

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = 15000
    const total = subtotal + shipping

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-2xl font-medium">shopping cart</h1>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="grid gap-6 md:grid-cols-2">
                                    <div className="flex gap-4">
                                        <div className="relative h-32 w-24 shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-medium">{item.brand}</h2>
                                            <p className="text-gray-600">{item.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start justify-between md:items-center">
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, false)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, true)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-right font-medium">
                                            Rp {item.price.toLocaleString()} IDR
                                        </p>
                                    </div>

                                    <div className="md:col-span-2 flex justify-end">
                                        <Button
                                            variant="destructive"
                                            className="text-sm"
                                            onClick={() => deleteItem(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>

                                    <Separator className="md:col-span-2" />
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="rounded-lg bg-[#FFE4BA]/50 p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="text-sm">
                                    enter promo code or gift card number
                                </label>
                                <Input
                                    className="mt-2 bg-white"
                                    placeholder="Enter code"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">subtotal:</span>
                                    <span>Rp {subtotal.toLocaleString()} IDR</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">estimated shipping:</span>
                                    <span>Free</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold">
                                    <span>total:</span>
                                    <span>Rp {total.toLocaleString()} IDR</span>
                                </div>
                            </div>

                            <Button
                                asChild
                                className="w-full bg-[#0A1172] text-lg font-medium hover:bg-[#0A1172]/90"
                            >
                                <Link href="/checkout/shipping">
                                    Checkout
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

