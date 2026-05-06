import axios from 'axios'

// ─── สร้าง Axios instance ──────────────────────────────────────────────────
// baseURL อ่านจาก .env (VITE_API_URL) และ fallback เป็น localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Request Interceptor ───────────────────────────────────────────────────
// ทุก request ที่ออกจาก api instance จะผ่านที่นี่ก่อน
// ถ้ามี token ใน localStorage จะแนบ Authorization header ให้อัตโนมัติ
// ทำให้ไม่ต้องเขียน Authorization header ซ้ำในทุก service
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('shopter_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
