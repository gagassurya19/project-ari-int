// lib/api/delivery.ts
import { NextResponse } from 'next/server';

const API_URL = '/api/transaction/delivery';  // Adjust if needed to match your API

export const getDeliveryOptions = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch delivery options');
  }
  return res.json();
};

export const createDeliveryOption = async (deliveryData: any) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deliveryData),
  });
  if (!res.ok) {
    throw new Error('Failed to create delivery option');
  }
  return res.json();
};
