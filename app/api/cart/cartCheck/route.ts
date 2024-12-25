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
    const cart = await prisma.cart.findFirst({
      where: {
        id: Number(cartId),
        userId: Number(userId)
      },
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