import axios from 'axios'

// ─── การตั้งค่า API (API Configuration) ──────────────────────────────────
// เชื่อมกับ Backend ที่ทำงานบน http://localhost:5000/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// ดึงข้อมูลหนังสือทั้งหมดจาก Backend
export const fetchBooks = async () => {
  try {
    const response = await api.get('/books')
    return response.data
  } catch (error) {
    console.error("Error fetching books:", error)
    throw error
  }
}

export default api
