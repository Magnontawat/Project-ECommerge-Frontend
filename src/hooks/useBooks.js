import { useState, useEffect } from 'react'
import { mockBooks } from '../data/mockData'
// TODO: ต่อ API ของจริง ให้ import { fetchBooks } จาก '../services/api' ตรงนี้แทน

/**
 * useBooks — Custom hook (ตัวช่วยส่วนตัว) สำหรับดึงข้อมูลรายชื่อหนังสือทั้งหมด
 *
 * ปัจจุบัน: ดึงข้อมูลจำลองมาจากไฟล์ mockData.js ก่อน
 * อนาคต: พอ Backend สร้างเสร็จ ให้เปลี่ยนจากการหน่วงเวลา (setTimeout) ไปเรียก API จริงแทน
 */
export function useBooks() {
  // สร้าง State สำหรับเก็บรายการหนังสือ, สถานะกำลังโหลด, และข้อผิดพลาด
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // จำลองการโหลดข้อมูลจากเซิร์ฟเวอร์ด้วยการหน่วงเวลา 300 มิลลิวินาที
    const timer = setTimeout(() => {
      setBooks(mockBooks)
      setLoading(false)
    }, 300) 
    
    // คืนค่าฟังก์ชันทำความสะอาดเมื่อคอมโพเนนต์ถูกลบออก (กัน memory leak)
    return () => clearTimeout(timer)
  }, [])

  // คืนค่าสถานะต่างๆ กลับไปให้คอมโพเนนต์อื่น (เช่น HomePage) เอาไปใช้งาน
  return { books, loading, error }
}
