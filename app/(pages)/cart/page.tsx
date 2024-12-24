"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Home, Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { getUserFromLocalStorage, useAuthGuard } from "@/lib/authenticate"
import { getCart, updateCartItem, removeFromCart } from "@/lib/api/cart"

export default function CartPage() {
    useAuthGuard()
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    // Fetch cart items when the component mounts
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const user = getUserFromLocalStorage();
                if (!user.id) throw new Error("User ID is missing");
                const userId = user.id;
                const cartData = await getCart(userId)
                // Ensure cartData is an array before setting it to state
                if (Array.isArray(cartData.items)) {
                    setCartItems(cartData.items)
                } else {
                    setCartItems([]); // Handle case when data is not an array
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error)
                setCartItems([]); // Set empty array on error
            } finally {
                setLoading(false)
            }
        }

        fetchCart()
    }, [])

    const updateQuantity = async (cartItemId: number, increment: number) => {
        try {
            // Kirim request untuk memperbarui kuantitas item
            const updatedItem = await updateCartItem(cartItemId, increment);

            // Pastikan response memiliki data yang valid
            if (updatedItem && updatedItem.id) {
                // Update state dengan data yang baru
                setCartItems((items) =>
                    items.map((item) =>
                        item.id === updatedItem.id
                            ? { ...item, quantity: updatedItem.quantity } // Mengupdate quantity saja
                            : item
                    )
                );
            } else {
                console.error("Invalid response for updated item:", updatedItem);
            }
        } catch (error) {
            console.error("Failed to update cart item:", error);
        }
    }

    const deleteItem = async (cartItemId: number) => {
        try {
            await removeFromCart(cartItemId)
            setCartItems(items => items.filter(item => item.id !== cartItemId))
        } catch (error) {
            console.error('Failed to remove item from cart:', error)
        }
    }

    const subtotal = cartItems.length > 0
        ? cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
        : 0;
    const shipping = subtotal == 0 ? 0 : 15000
    const total = subtotal + shipping

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            {total !== 0 ? (
                <div className="container mx-auto px-4 py-8">
                    <h1 className="mb-8 text-2xl font-medium">Shopping Cart</h1>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="grid gap-6 md:grid-cols-2">
                                        <div className="flex gap-4">
                                            <div className="relative h-32 w-24 shrink-0">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-medium">{item.product.brand}</h2>
                                                <p className="text-gray-600">{item.product.name}</p>
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
                                                        onClick={() => updateQuantity(item.id, (item.quantity < 1 ? 1 : item.quantity - 1))}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => updateQuantity(item.id, (item.quantity + 1))}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="text-right font-medium">
                                                Rp {item.product.price} IDR
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
                                        Enter promo code or gift card number
                                    </label>
                                    <Input
                                        className="mt-2 bg-white"
                                        placeholder="Enter code"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span>Rp {subtotal} IDR</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Estimated shipping:</span>
                                        <span>Free</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>Rp {total} IDR</span>
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
            ) : (
                <div className="flex items-center justify-center h-screen w-full">
                    <div className="text-center max-w-md mx-auto">
                        <h1 className="text-2xl font-bold">Keranjang Belanja Kosong</h1>
                        <div className="flex flex-col items-center space-y-4 mt-4">
                            <ShoppingCart className="w-24 h-24 text-muted-foreground" />
                            <p className="text-center text-muted-foreground">
                                Keranjang belanja Anda masih kosong. Mulailah berbelanja untuk menambahkan produk.
                            </p>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button asChild>
                                <Link href="/" className="flex items-center space-x-2">
                                    <Home className="w-4 h-4" />
                                    <span>Kembali ke Beranda</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}
