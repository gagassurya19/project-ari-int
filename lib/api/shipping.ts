// lib/api/shipping.ts
import { NextResponse } from 'next/server';

const API_URL = '/api/transaction/shipping';  // Adjust if needed to match your API

export const getShippingAddresses = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch shipping addresses');
  }
  return res.json();
};

export const createShippingAddress = async (shippingData: any) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shippingData),
  });
  if (!res.ok) {
    throw new Error('Failed to create shipping address');
  }
  return res.json();
};
