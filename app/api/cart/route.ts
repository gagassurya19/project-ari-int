import { NextResponse } from 'next/server'; // Mengimpor NextResponse dari Next.js untuk membuat respons HTTP
import prisma from '@/lib/prisma'; // Mengimpor Prisma client untuk berinteraksi dengan database

// GET: Mengambil semua item keranjang untuk pengguna tertentu
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Mengambil parameter query dari URL
  const userId = searchParams.get('userId'); // Mendapatkan 'userId' dari parameter query
  const cartId = searchParams.get('cartId'); // Mendapatkan 'cartId' dari parameter query

  if (!userId && !cartId) {
    return NextResponse.json(
      { error: 'userId or cartId is required' },
      { status: 400 } // Mengembalikan error jika tidak ada 'userId' atau 'cartId'
    );
  }

  try {
    // Menyaring cart berdasarkan cartId atau userId
    const cartFilter: any = cartId
      ? { id: Number(cartId) }  // Jika cartId ada, gunakan cartId
      : { userId: Number(userId) }; // Jika cartId tidak ada, gunakan userId

    const cart = await prisma.cart.findFirst({
      where: cartFilter, // Menyaring cart berdasarkan filter
      include: {
        items: {
          include: {
            product: true, // Termasuk informasi produk dalam setiap item keranjang
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 } // Mengembalikan error jika keranjang tidak ditemukan
      );
    }

    return NextResponse.json(cart); // Mengembalikan data keranjang yang ditemukan
  } catch (error: any) {
    console.error('GET Error:', error.message); // Menangani error saat pengambilan data
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 } // Mengembalikan error jika terjadi kesalahan pada server
    );
  }
}


// POST: Menambahkan produk ke dalam keranjang
export async function POST(req: Request) {
  const { userId, productId, quantity, cartId } = await req.json(); // Mengambil data dari body request

  if (!userId || !productId || !quantity) {
    return NextResponse.json(
      { error: 'userId, productId, and quantity are required' },
      { status: 400 } // Mengembalikan error jika 'userId', 'productId', atau 'quantity' tidak ada
    );
  }

  try {
    let cart;

    if (cartId) {
      // Jika cartId disediakan, cari keranjang berdasarkan cartId
      cart = await prisma.cart.findUnique({
        where: { id: Number(cartId) },
      });
    }

    // Jika keranjang tidak ditemukan, buat keranjang baru
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: Number(userId), // Menyimpan userId untuk membuat keranjang baru
        },
      });
    }

    // Periksa apakah item sudah ada dalam keranjang
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId), // Menyaring berdasarkan cartId dan productId
      },
    });

    if (existingItem) {
      // Jika item sudah ada, perbarui kuantitasnya
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + Number(quantity), // Menambahkan kuantitas yang baru
        },
      });

      return NextResponse.json(updatedItem); // Mengembalikan item yang diperbarui
    }

    // Jika item belum ada, tambahkan item baru ke keranjang
    const newItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: Number(productId),
        quantity: Number(quantity), // Menyimpan item baru dengan kuantitas yang ditentukan
      },
    });

    return NextResponse.json({
      newItem,
      id: cart.id, // Mengembalikan cartId untuk disimpan di client-side
    });
  } catch (error: any) {
    console.error('POST Error:', error.message); // Menangani error pada proses POST
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 } // Mengembalikan error jika gagal menambahkan item
    );
  }
}

// PATCH: Memperbarui kuantitas item dalam keranjang
export async function PATCH(req: Request) {
  const { cartItemId, quantity } = await req.json(); // Mengambil data yang diperlukan dari body request

  if (!cartItemId || !quantity) {
    return NextResponse.json(
      { error: 'cartItemId and quantity are required' },
      { status: 400 } // Mengembalikan error jika 'cartItemId' atau 'quantity' tidak ada
    );
  }

  try {
    const updatedItem = await prisma.cartItem.update({
      where: { id: Number(cartItemId) }, // Menyaring berdasarkan cartItemId
      data: { quantity: Number(quantity) }, // Memperbarui kuantitas item
    });

    return NextResponse.json(updatedItem); // Mengembalikan item yang diperbarui
  } catch (error: any) {
    console.error('PATCH Error:', error.message); // Menangani error saat memperbarui item
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 } // Mengembalikan error jika gagal memperbarui item
    );
  }
}

// DELETE: Menghapus item dari keranjang
export async function DELETE(req: Request) {
  const { cartItemId } = await req.json(); // Mengambil cartItemId dari body request

  if (!cartItemId) {
    return NextResponse.json(
      { error: 'cartItemId is required' },
      { status: 400 } // Mengembalikan error jika 'cartItemId' tidak ada
    );
  }

  try {
    await prisma.cartItem.delete({
      where: { id: Number(cartItemId) }, // Menghapus item berdasarkan cartItemId
    });

    return NextResponse.json({ message: 'Cart item deleted successfully' }); // Mengembalikan pesan sukses
  } catch (error: any) {
    console.error('DELETE Error:', error.message); // Menangani error saat menghapus item
    return NextResponse.json(
      { error: 'Failed to delete cart item' },
      { status: 500 } // Mengembalikan error jika gagal menghapus item
    );
  }
}
