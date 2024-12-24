import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Get all products with their galleries
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const productId = url.searchParams.get("productId"); // Ambil query parameter 'id'
    
    // Jika 'id' ada, cari produk berdasarkan 'id', jika tidak, cari semua produk
    const products = productId
      ? await prisma.product.findUnique({
          where: { id: parseInt(productId) }, // Cari berdasarkan id produk
          include: {
            gallery: true, // Include related galleries
          },
        })
      : await prisma.product.findMany({
          include: {
            gallery: true, // Include related galleries
          },
        });

    if (!products) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { brand, name, price, rating, image, description, galleryImages } = body;
    if (!brand || !name || !price || !rating || !image || !description || !galleryImages) {
      return NextResponse.json(
        { error: 'Invalid data provided.' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        brand,
        name,
        price,
        rating,
        image,
        description,
        gallery: {
          create: galleryImages.map((img: string) => ({ imageUrl: img })),
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to create product.' },
      { status: 500 }
    );
  }
}
