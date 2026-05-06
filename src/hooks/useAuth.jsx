// hooks/useAuth.jsx
// Re-exports จาก AuthContext เพื่อให้ import ได้จากทั้ง 2 path
// ตัว logic จริงอยู่ที่ src/context/AuthContext.jsx
export { useAuth, AuthProvider, AuthContext } from '../context/AuthContext'
