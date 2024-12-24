import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const shippingId = url.searchParams.get("shippingId");
    
   const shipping = shippingId
      ? await prisma.shipping.findUnique({
          where: { id: parseInt(shippingId) },
        })
      : await prisma.shipping.findMany();

    if (!shipping) {
      return NextResponse.json({ error: 'Shipping not found.' }, { status: 404 });
    }

    return NextResponse.json(shipping);
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
