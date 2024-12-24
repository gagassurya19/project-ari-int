import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all cart items for a specific user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const cartId = searchParams.get('cartId');

  if (!userId && !cartId) {
    return NextResponse.json(
      { error: 'userId or cartId is required' },
      { status: 400 }
    );
  }

  try {
    // Convert cartId to number if it's provided
    const cartFilter: any = cartId
      ? { id: Number(cartId) }  // Ensure cartId is a number
      : { userId: Number(userId) };

    const cart = await prisma.cart.findFirst({
      where: cartFilter,
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
  const { userId, productId, quantity, cartId } = await req.json(); // Accept cartId from the request

  if (!userId || !productId || !quantity) {
    return NextResponse.json(
      { error: 'userId, productId, and quantity are required' },
      { status: 400 }
    );
  }

  try {
    let cart;

    if (cartId) {
      // If cartId is provided, find the cart by cartId
      cart = await prisma.cart.findUnique({
        where: { id: Number(cartId) },
      });
    }

    // Create a new cart if none exists
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

    // Add a new item to the cart if it doesn't exist
    const newItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: Number(productId),
        quantity: Number(quantity),
      },
    });

    return NextResponse.json({
      newItem,
      id: cart.id, // Return the cartId for the client-side to store in localStorage
    });
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
