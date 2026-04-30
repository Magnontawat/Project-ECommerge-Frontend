import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import './index.css'

// จุดเริ่มต้นของแอปพลิเคชัน React
createRoot(document.getElementById('root')).render(
  // StrictMode ช่วยเตือนโค้ดที่อาจมีปัญหา (แสดงผลเฉพาะตอน Development)
  <StrictMode>
    {/* BrowserRouter ช่วยจัดการระบบเปลี่ยนหน้า (Routing) ในเว็บของเรา */}
    <BrowserRouter>
      {/* AuthProvider เป็นตัวจ่ายข้อมูลการล็อกอิน ให้กระจายไปทั่วแอป */}
      <AuthProvider>
        {/* เรียกใช้งานคอมโพเนนต์หลัก */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
