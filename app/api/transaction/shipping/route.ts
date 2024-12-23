import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const shippings = await prisma.shipping.findMany();
    return NextResponse.json(shippings);
  } catch (error) {
    console.error('GET Shipping Error:', error);
    return NextResponse.json({ error: 'Failed to fetch shipping addresses.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const shippingData = await req.json();
    const shipping = await prisma.shipping.create({ data: shippingData });
    return NextResponse.json(shipping);
  } catch (error) {
    console.error('POST Shipping Error:', error);
    return NextResponse.json({ error: 'Failed to create shipping address.' }, { status: 500 });
  }
}
