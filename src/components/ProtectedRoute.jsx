import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * ProtectedRoute - คอมโพเนนต์สำหรับป้องกันการเข้าถึงหน้าเพจ
 * 
 * 
 * @param {children} - หน้าเพจที่ต้องการแสดงถ้าผ่านเงื่อนไข
 * @param {role} - ระดับสิทธิ์ที่ต้องการ (เช่น 'admin')
 */
const ProtectedRoute = ({ children, role }) => {
  const { isLoggedIn, user, isLoading } = useAuth()

  // 1. ถ้ากำลังโหลดข้อมูล (เช่น เช็ค Token จาก localStorage) ให้รอแว็บนึง
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    )
  }

  // 2. ถ้ายังไม่ได้ Login ให้ส่งกลับไปหน้า Home
  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }

  // 3. ถ้ากำหนด role ไว้ และ user ที่ Login เข้ามามี role ไม่ตรง
  // (เช่น หน้า Admin แต่คน Login เป็น User ธรรมดา) ให้ส่งกลับหน้า Home
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />
  }

  // 4. ถ้าผ่านเงื่อนไขทั้งหมด ให้แสดงหน้าเพจนั้นๆ (children)
  return children
}

export default ProtectedRoute
