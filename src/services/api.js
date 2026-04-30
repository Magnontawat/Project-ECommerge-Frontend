import axios from 'axios'

// ─── การตั้งค่า API (API Configuration) ──────────────────────────────────
// TODO: อนาคตจะใช้เชื่อมกับ Backend จริง — ดึง URL หลักมาจากไฟล์ .env (VITE_API_URL)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ตัวดักจับคำขอ (Request Interceptor) - ใช้สำหรับแนบ JWT token ไปด้วยทุกครั้งที่เรียก API
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ตัวดักจับการตอบกลับ (Response Interceptor) - ดักจับ error กรณีที่ Token หมดอายุ (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: ถ้าหมดอายุ ให้ลบ token และเตะผู้ใช้กลับไปหน้า Login
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)

export default api
