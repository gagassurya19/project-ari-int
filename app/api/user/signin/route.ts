import { NextResponse } from 'next/server'; // Mengimpor NextResponse dari Next.js untuk membalas permintaan HTTP
import prisma from '@/lib/prisma'; // Mengimpor Prisma client untuk menghubungkan aplikasi dengan database
import bcrypt from 'bcrypt'; // Mengimpor bcrypt untuk melakukan hashing dan verifikasi password
import jwt from 'jsonwebtoken'; // Mengimpor jsonwebtoken untuk membuat token JWT

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Mendapatkan secret key untuk JWT dari environment variable atau nilai default
// Pastikan mengganti 'your_secret_key' dengan key yang lebih aman pada production

// Fungsi untuk menangani request POST yang digunakan untuk login
export async function POST(req: Request) {
  // Mengambil data username dan password dari body request
  const { username, password } = await req.json();

  // Memeriksa apakah username dan password ada, jika tidak, kembalikan response error
  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }

  try {
    // Mencari user berdasarkan username
    const user = await prisma.user.findUnique({ where: { username } });
    
    // Jika user tidak ditemukan, kembalikan response error
    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    // Verifikasi apakah password yang diberikan cocok dengan password yang ada di database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    // Jika password tidak valid, kembalikan response error
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    // Jika username dan password valid, buat JWT token untuk autentikasi lebih lanjut
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Kembalikan response sukses dengan token dan informasi user
    return NextResponse.json({ message: 'Login successful.', token, user });
  } catch (error) {
    // Menangani error jika terjadi kesalahan dalam proses login
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 });
  }
}
