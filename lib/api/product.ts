// lib/api/product.ts
const API_URL = '/api/product';  // Adjust if needed to match your API

// mengambil semua data product dari backend dengan API
export const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};

// mengambil detail dari sebuah product berdasarkan dari ID productnya
export const getProductDetail = async (productId: number) => {
    const res = await fetch(`${API_URL}?productId=${productId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    return res.json();
  };

// menambah data product
export const createProduct = async (productData: any) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    throw new Error('Failed to create product');
  }
  return res.json();
};
