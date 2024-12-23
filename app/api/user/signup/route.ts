import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return NextResponse.json({ error: 'Username already taken.' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User registered successfully.', user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
}
