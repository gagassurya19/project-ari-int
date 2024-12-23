// lib/api/transaction.ts
import { NextResponse } from 'next/server';

const API_URL = '/api/transaction';  // Adjust if needed to match your API

export const getTransactions = async (userId: number) => {
    var endpoint = ''
    if(userId) {
        endpoint = `${API_URL}?userId=${userId}`
    } else {
        endpoint = API_URL
    }
    const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return res.json();
};

export const createTransaction = async (transactionData: any) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transactionData),
  });
  if (!res.ok) {
    throw new Error('Failed to create transaction');
  }
  return res.json();
};

export const updateTransactionStatus = async (id: number, status: string) => {
  const res = await fetch(API_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, status }),
  });
  if (!res.ok) {
    throw new Error('Failed to update transaction status');
  }
  return res.json();
};

export const deleteTransaction = async (id: number) => {
  const res = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    throw new Error('Failed to delete transaction');
  }
  return res.json();
};
