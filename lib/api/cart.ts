// lib/api/cart.ts
const API_URL = '/api/cart';  // Adjust if needed to match your API

// Get the cart. If cartId is provided, it uses that, otherwise, fetches based on userId
export const getCart = async (userId: number, cartId?: string) => {
  const url = cartId ? `${API_URL}?cartId=${cartId}` : `${API_URL}?userId=${userId}`;
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error('Failed to fetch cart');
  }
  
  return res.json();
};

// Function to create a new cart and add at least one product
export const createCart = async (userId: number, productId: number, quantity: number) => {
  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      productId,
      quantity,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create cart and add product');
  }

  return res.json();
};

// Function to add a product to the cart
export const addToCart = async (userId: number, productId: number, quantity: number, cartId?: number) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      productId,
      quantity,
      cartId,  // Include cartId if it exists, otherwise a new cart will be created
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to add product to cart');
  }

  const data = await res.json();
  return data; // This will return either the updated or newly added item along with the cartId
};

// Update the quantity of a cart item
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
