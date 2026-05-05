import api from './api';

/**
 * สร้างหนังสือใหม่ (Admin Only)
 * POST /api/books
 * ใช้ multipart/form-data เพื่อรองรับการอัปโหลดรูปภาพปก
 */
export async function createBook(formData) {
  try {
    const token = localStorage.getItem('shopter_token');
    const response = await api.post('/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'เกิดข้อผิดพลาดในการเพิ่มหนังสือ';
    throw new Error(message);
  }
}
