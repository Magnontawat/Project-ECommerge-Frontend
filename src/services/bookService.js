import api from './api'

// ดึงข้อมูลหนังสือทั้งหมดจาก Backend
export async function fetchBooks() {
  try {
    const response = await api.get('/books')
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}

// ดึงข้อมูลหนังสือตาม ID
export async function fetchBookById(id) {
  try {
    const response = await api.get(`/books/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error)
    throw error
  }
}

// สร้างหนังสือใหม่ (Admin Only)
// POST /api/books — ใช้ multipart/form-data เพื่อรองรับการอัปโหลดรูปภาพปก
// Authorization header ถูกแนบอัตโนมัติโดย interceptor ใน api.js
export async function createBook(formData) {
  try {
    const response = await api.post('/books', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || 'เกิดข้อผิดพลาดในการเพิ่มหนังสือ'
    throw new Error(message)
  }
}
