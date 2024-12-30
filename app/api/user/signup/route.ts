import { NextResponse } from 'next/server'; // Mengimpor NextResponse dari Next.js untuk membalas permintaan HTTP
import prisma from '@/lib/prisma'; // Mengimpor Prisma client untuk menghubungkan aplikasi dengan database
import bcrypt from 'bcrypt'; // Mengimpor bcrypt untuk melakukan hashing password

// Fungsi untuk menangani request POST yang digunakan untuk registrasi pengguna
export async function POST(req: Request) {
  // Mengambil data username dan password dari body request
  const { username, password } = await req.json();

  // Memeriksa apakah username dan password ada, jika tidak, kembalikan response error
  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }

  try {
    // Memeriksa apakah user dengan username yang sama sudah ada di database
    const existingUser = await prisma.user.findUnique({ where: { username } });
    
    // Jika user dengan username tersebut sudah ada, kembalikan response error
    if (existingUser) {
      return NextResponse.json({ error: 'Username already taken.' }, { status: 409 });
    }

    // Melakukan hashing pada password sebelum menyimpannya ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membuat pengguna baru dengan data yang diberikan (username dan password yang sudah di-hash)
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Kembalikan response sukses dengan status 201 (Created), menyertakan pesan dan data pengguna yang baru dibuat
    return NextResponse.json({ message: 'User registered successfully.', user }, { status: 201 });
  } catch (error) {
    // Menangani error jika terjadi kesalahan dalam proses registrasi
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
}
