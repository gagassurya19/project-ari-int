import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const payments = await prisma.payment.findMany();
    return NextResponse.json(payments);
  } catch (error) {
    console.error('GET Payment Error:', error);
    return NextResponse.json({ error: 'Failed to fetch payment methods.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const paymentData = await req.json();
    const payment = await prisma.payment.create({ data: paymentData });
    return NextResponse.json(payment);
  } catch (error) {
    console.error('POST Payment Error:', error);
    return NextResponse.json({ error: 'Failed to create payment method.' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedPayment);
  } catch (error) {
    console.error('PATCH Payment Error:', error);
    return NextResponse.json({ error: 'Failed to update payment method.' }, { status: 500 });
  }
}
