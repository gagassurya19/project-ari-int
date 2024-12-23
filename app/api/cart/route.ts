import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all cart items for a specific user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'userId is required' },
      { status: 400 }
    );
  }

  try {
    const cart = await prisma.cart.findFirst({
      where: { userId: Number(userId) },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(cart);
  } catch (error: any) {
    console.error('GET Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// POST: Add a product to the cart
export async function POST(req: Request) {
  const { userId, productId, quantity } = await req.json();

  if (!userId || !productId || !quantity) {
    return NextResponse.json(
      { error: 'userId, productId, and quantity are required' },
      { status: 400 }
    );
  }

  try {
    // Check if the cart exists
    let cart = await prisma.cart.findFirst({
      where: { userId: Number(userId) },
    });

    // Create a cart if it doesn't exist
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: Number(userId),
        },
      });
    }

    // Check if the item already exists in the cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId),
      },
    });

    if (existingItem) {
      // Update the quantity if the item exists
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + Number(quantity),
        },
      });

      return NextResponse.json(updatedItem);
    }

    // Add a new item to the cart
    const newItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: Number(productId),
        quantity: Number(quantity),
      },
    });

    return NextResponse.json(newItem);
  } catch (error: any) {
    console.error('POST Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

// PATCH: Update quantity of a cart item
export async function PATCH(req: Request) {
  const { cartItemId, quantity } = await req.json();

  if (!cartItemId || !quantity) {
    return NextResponse.json(
      { error: 'cartItemId and quantity are required' },
      { status: 400 }
    );
  }

  try {
    const updatedItem = await prisma.cartItem.update({
      where: { id: Number(cartItemId) },
      data: { quantity: Number(quantity) },
    });

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    console.error('PATCH Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}

// DELETE: Remove an item from the cart
export async function DELETE(req: Request) {
  const { cartItemId } = await req.json();

  if (!cartItemId) {
    return NextResponse.json(
      { error: 'cartItemId is required' },
      { status: 400 }
    );
  }

  try {
    await prisma.cartItem.delete({
      where: { id: Number(cartItemId) },
    });

    return NextResponse.json({ message: 'Cart item deleted successfully' });
  } catch (error: any) {
    console.error('DELETE Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to delete cart item' },
      { status: 500 }
    );
  }
}
