// lib/api/payment.ts
import { NextResponse } from 'next/server';

const API_URL = '/api/transaction/payment';  // Adjust if needed to match your API

export const getPaymentMethods = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch payment methods');
  }
  return res.json();
};

export const createPaymentMethod = async (paymentData: any) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });
  if (!res.ok) {
    throw new Error('Failed to create payment method');
  }
  return res.json();
};

export const updatePaymentStatus = async (id: number, status: string) => {
  const res = await fetch(API_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, status }),
  });
  if (!res.ok) {
    throw new Error('Failed to update payment status');
  }
  return res.json();
};
