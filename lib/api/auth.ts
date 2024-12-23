// lib/api/auth.ts
const API_URL = '/api/user';  // Adjust if needed to match your API

export const signIn = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error('Failed to sign in');
  }
  return res.json();
};

export const signUp = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error('Failed to sign up');
  }
  return res.json();
};
