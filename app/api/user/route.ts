import { NextResponse } from 'next/server'; // Mengimpor NextResponse dari Next.js untuk mengirimkan respons HTTP
import prisma from '@/lib/prisma'; // Mengimpor Prisma client untuk menghubungkan aplikasi dengan database
import bcrypt from 'bcrypt'; // Mengimpor bcrypt, meskipun di sini tidak digunakan karena hanya GET data pengguna

// Fungsi untuk menangani request GET yang digunakan untuk mengambil data pengguna berdasarkan ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Mengambil parameter query dari URL request
  const id = searchParams.get('id'); // Mendapatkan nilai ID dari parameter query

  // Memeriksa apakah ID ada dalam query. Jika tidak, kembalikan respons error.
  if (!id) {
    return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
  }

  try {
    // Mencari pengguna berdasarkan ID yang diberikan
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) }, // Mencari pengguna dengan ID yang sudah diparsing ke integer
    });

    // Jika pengguna tidak ditemukan, kembalikan respons error
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Menghapus password dari respons untuk alasan keamanan
    const { password, ...userWithoutPassword } = user;

    // Mengembalikan data pengguna tanpa password
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    // Menangani error jika terjadi kesalahan dalam proses pengambilan data pengguna
    return NextResponse.json({ error: 'Failed to fetch user.' }, { status: 500 });
  }
}
