// lib/api/cart.ts
const API_URL = '/api/cart';  // Adjust if needed to match your API

export const getCart = async (userId: number) => {
  const res = await fetch(`${API_URL}?userId=${userId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch cart');
  }
  return res.json();
};

export const addToCart = async (userId: number, productId: number, quantity: number) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, productId, quantity }),
  });
  if (!res.ok) {
    throw new Error('Failed to add product to cart');
  }
  return res.json();
};

export const updateCartItem = async (cartItemId: number, quantity: number) => {
  const res = await fetch(`${API_URL}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartItemId, quantity }),
  });
  if (!res.ok) {
    throw new Error('Failed to update cart item');
  }
  return res.json();
};

export const removeFromCart = async (cartItemId: number) => {
  const res = await fetch(`${API_URL}`, {
    method: 'DELETE',
    body: JSON.stringify({ cartItemId })
  });
  if (!res.ok) {
    throw new Error('Failed to remove item from cart');
  }
  return res.json();
};
