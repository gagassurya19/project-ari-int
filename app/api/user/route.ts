import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

// GET User by ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Exclude the password from the response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user.' }, { status: 500 });
  }
}
