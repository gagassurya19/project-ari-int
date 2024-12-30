"use client" // Menandakan bahwa ini adalah komponen yang berjalan di sisi klien (browser) pada Next.js

import { useEffect } from "react" // Mengimpor hook useEffect dari React untuk menjalankan efek samping
import Image from "next/image" // Mengimpor komponen Image dari Next.js untuk menangani gambar secara optimal
import Link from "next/link" // Mengimpor Link dari Next.js untuk navigasi antar halaman
import { ShoppingCart, Home, Minus, Plus } from 'lucide-react' // Mengimpor ikon dari lucide-react untuk digunakan dalam UI
import useLocalStorageState from 'use-local-storage-state' // Mengimpor hook untuk mengelola state yang disimpan di localStorage
import { Button } from "@/components/ui/button" // Mengimpor komponen Button
import { Input } from "@/components/ui/input" // Mengimpor komponen Input
import { Separator } from "@/components/ui/separator" // Mengimpor komponen Separator
import { Header } from "@/components/header" // Mengimpor komponen Header
import { getUserFromLocalStorage, useAuthGuard } from "@/lib/authenticate" // Mengimpor fungsi untuk autentikasi dan pengambilan data pengguna
import { getCart, updateCartItem, removeFromCart, checkCart } from "@/lib/api/cart" // Mengimpor API untuk menangani keranjang belanja
import Loading from "@/components/loading" // Mengimpor komponen Loading untuk menampilkan status pemuatan

interface Product { // Interface untuk mendefinisikan bentuk data produk
    id: number
    name: string
    price: number
    brand: string
    image: string
}

interface CartItem { // Interface untuk mendefinisikan bentuk data item dalam keranjang belanja
    id: number
    quantity: number
    product: Product
}

export default function CartPage() { // Fungsi utama untuk halaman keranjang belanja
    useAuthGuard() // Memastikan bahwa pengguna telah terautentikasi
    const [cartItems, setCartItems] = useLocalStorageState<CartItem[]>('cart_items', { // Mengambil dan mengatur state keranjang belanja dari localStorage
        defaultValue: []
    })
    const [loading, setLoading] = useLocalStorageState<boolean>('cart_loading', { // Mengambil dan mengatur state loading
        defaultValue: true
    })

    useEffect(() => { // Hook useEffect untuk mengambil data keranjang saat komponen dimuat
        const fetchCart = async () => { // Fungsi untuk mengambil data keranjang dari server
            try {
                const user = getUserFromLocalStorage(); // Mendapatkan data pengguna dari localStorage
                if (!user.id) throw new Error("User ID is missing"); // Jika ID pengguna tidak ada, lempar error

                const cartId = localStorage.getItem("cart_id") // Mengambil ID keranjang dari localStorage

                if(cartId) { // Jika ID keranjang ada
                    const check = await checkCart(user.id, cartId); // Memeriksa apakah keranjang milik pengguna
                    if(check){
                        const cartData = await getCart(user.id, cartId) // Mengambil data keranjang
                        setCartItems(Array.isArray(cartData.items) ? cartData.items : []) // Menyimpan data keranjang dalam state
                    }
                } else {
                    return // Jika tidak ada ID keranjang, keluar dari fungsi
                }

            } catch (error) { // Menangani error jika terjadi kesalahan dalam pengambilan data
                console.error("Failed to fetch cart:", error)
                setCartItems([]) // Mengatur state keranjang menjadi kosong jika terjadi error
            } finally {
                setLoading(false) // Mengatur loading menjadi false setelah proses selesai
            }
        }

        fetchCart() // Memanggil fungsi fetchCart
    }, [setCartItems, setLoading]) // Dependency array untuk memastikan efek hanya dijalankan sekali

    const updateQuantity = async (cartItemId: number, increment: number) => { // Fungsi untuk memperbarui jumlah item dalam keranjang
        try {
            const updatedItem = await updateCartItem(cartItemId, increment) // Memperbarui item keranjang di server
            if (updatedItem?.id) { // Jika item berhasil diperbarui
                setCartItems((prevItems) =>
                    prevItems.map(item =>
                        item.id === updatedItem.id
                            ? { ...item, quantity: updatedItem.quantity } // Memperbarui jumlah item dalam state
                            : item
                    )
                )
            }
        } catch (error) { // Menangani error jika gagal memperbarui item
            console.error("Failed to update cart item:", error)
        }
    }

    const deleteItem = async (cartItemId: number) => { // Fungsi untuk menghapus item dari keranjang
        try {
            await removeFromCart(cartItemId) // Menghapus item dari keranjang di server
            setCartItems((prevItems) => prevItems.filter(item => item.id !== cartItemId)) // Menghapus item dari state
        } catch (error) { // Menangani error jika gagal menghapus item
            console.error('Failed to remove item from cart:', error)
        }
    }

    const subtotal = cartItems.reduce((sum, item) =>
        sum + (item.product.price * item.quantity), 0) // Menghitung subtotal berdasarkan jumlah dan harga item
    const shipping = subtotal === 0 ? 0 : 15000 // Menentukan biaya pengiriman (0 jika keranjang kosong, 15000 jika ada item)
    const total = subtotal + shipping // Menghitung total harga

    if (loading) { // Jika sedang dalam proses pemuatan
        return <Loading /> // Menampilkan komponen loading
    }

    if (cartItems.length === 0) { // Jika tidak ada item dalam keranjang
        return (
            <div className="min-h-screen bg-white">
                <Header /> {/* Menampilkan Header */}
                <div className="flex items-center justify-center h-screen w-full">
                    <div className="text-center max-w-md mx-auto">
                        <h1 className="text-2xl font-bold">Keranjang Belanja Kosong</h1>
                        <div className="flex flex-col items-center space-y-4 mt-4">
                            <ShoppingCart className="w-24 h-24 text-muted-foreground" />
                            <p className="text-muted-foreground">
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
            </div>
        )
    }

    return ( // Jika ada item dalam keranjang, tampilkan halaman keranjang
        <div className="min-h-screen bg-white">
            <Header /> {/* Menampilkan Header */}
            {total !== 0 ? ( // Jika total tidak sama dengan 0, tampilkan isi keranjang
                <div className="container mx-auto px-4 py-8">
                    <h1 className="mb-8 text-2xl font-medium">Shopping Cart</h1>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="space-y-6">
                                {cartItems.map((item) => ( // Loop untuk menampilkan setiap item dalam keranjang
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
