// ---------------------------------------------------------------------------
// authService.js — จำลอง API calls สำหรับ Authentication
// ในอนาคตแทนที่ด้วย fetch('/api/auth/login') จริงๆ
// ---------------------------------------------------------------------------

const FAKE_DELAY_MS = 1200; // จำลอง network latency

// Mock user database
const MOCK_USERS = [
  { id: 1, email: 'demo@shopter.com', password: 'demo1234', name: 'Demo User' },
  { id: 2, email: 'admin@shopter.com', password: 'admin123', name: 'Admin' },
];

/**
 * จำลองการ Login — ในอนาคตเปลี่ยนเป็น:
 * const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
 */
export async function loginUser({ email, password }) {
  await new Promise(resolve => setTimeout(resolve, FAKE_DELAY_MS));

  const user = MOCK_USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    throw new Error('Invalid email or password. Please try again.');
  }

  // In the future, this token will come from the backend (e.g., JWT)
  const mockToken = btoa(`${user.id}:${user.email}:${Date.now()}`);

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token: mockToken,
  };
}

/**
 * จำลองการ Logout
 */
export async function logoutUser() {
  await new Promise(resolve => setTimeout(resolve, 300));
  // In the future: await fetch('/api/auth/logout', { method: 'POST' });
  return true;
}
