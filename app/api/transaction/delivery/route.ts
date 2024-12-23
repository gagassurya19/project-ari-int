import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const deliveries = await prisma.delivery.findMany();
    return NextResponse.json(deliveries);
  } catch (error) {
    console.error('GET Delivery Error:', error);
    return NextResponse.json({ error: 'Failed to fetch delivery options.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const deliveryData = await req.json();
    const delivery = await prisma.delivery.create({ data: deliveryData });
    return NextResponse.json(delivery);
  } catch (error) {
    console.error('POST Delivery Error:', error);
    return NextResponse.json({ error: 'Failed to create delivery option.' }, { status: 500 });
  }
}
