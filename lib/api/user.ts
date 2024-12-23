// lib/api/user.ts
const API_URL = '/api/user';  // Adjust if needed to match your API

export const getUser = async (id: number) => {
  const res = await fetch(`${API_URL}?id=${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }
  return res.json();
};
