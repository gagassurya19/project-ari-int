import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // prisma -> untuk penghubung dari database dengan backend.

// get data dari database mysql
// query: SELECT * FROM product;
// prisma: prisma.findMany({include: {gallery: true});

// Get all products with their galleries
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const productId = url.searchParams.get("productId"); // Ambil query parameter 'id'
    
    // Jika 'id' ada, cari produk berdasarkan 'id', jika tidak, cari semua produk
    const products = productId
      ? await prisma.product.findUnique({ // findUniqe -> ambil hanya 1 produk
          where: { id: parseInt(productId) }, // Cari berdasarkan id produk
          include: {
            gallery: true, // Include related galleries
          },
        })
      : await prisma.product.findMany({ // findMany -> ambil lebih dari 1 produk
          include: {
            gallery: true, // Include related galleries
          },
        });

    // kalo produk gada datanya di database
    if (!products) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    // kalo datanya ada tinggal return
    return NextResponse.json(products);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    // ambil dari body yang di kirim dari frontend dengan RestAPI
    const body = await req.json();

    // parsing data dari body
    const { brand, name, price, rating, image, description, galleryImages } = body;

    // semua data body harus ada, jika tidak return invalid
    if (!brand || !name || !price || !rating || !image || !description || !galleryImages) {
      return NextResponse.json(
        { error: 'Invalid data provided.' },
        { status: 400 }
      );
    }

    // query insert data baru ke database dengan menggunakan prisma
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
