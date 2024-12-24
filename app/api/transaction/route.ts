import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId'); // Mendapatkan userId dari query string
    if (!userId) {
      return NextResponse.json({ error: 'userId is required.' }, { status: 400 });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: parseInt(userId), // Menambahkan filter berdasarkan userId
      },
      include: {
        user: true,
        cart: {
          include: {
            items: {
              include: {
                product: true, // Menyertakan detail produk
              },
            },
          },
        },
        shippingAddress: true,
        deliveryOption: true,
        paymentMethod: true,
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('GET Transaction Error:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      userId,
      cartId,
      shippingId,
      deliveryId,
      paymentId,
      status,
    } = await req.json();

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        cartId,
        shippingId,
        deliveryId,
        paymentId,
        status: status || 'Pending',
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('POST Transaction Error:', error);
    return NextResponse.json({ error: 'Failed to create transaction.' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error('PATCH Transaction Error:', error);
    return NextResponse.json({ error: 'Failed to update transaction.' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    await prisma.transaction.delete({ where: { id } });
    return NextResponse.json({ message: 'Transaction deleted successfully.' });
  } catch (error) {
    console.error('DELETE Transaction Error:', error);
    return NextResponse.json({ error: 'Failed to delete transaction.' }, { status: 500 });
  }
}
