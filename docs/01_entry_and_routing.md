# Chapter 1: Entry Point & Routing

## บทบาทของไฟล์นี้ในระบบ
```
browser → index.html → main.jsx → App.jsx → pages
```
ทุก Request จาก Browser เริ่มต้นที่นี่ก่อนเสมอ

---

## 1. `src/main.jsx` — จุดเชื่อม React กับ HTML

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### อธิบาย:
- `getElementById('root')` — หา `<div id="root">` ใน `index.html`
- `createRoot(...).render(...)` — ฉีด React ลงไปใน div นั้น
- `<StrictMode>` — ทำให้ React แจ้งเตือน potential bugs เพิ่มขึ้น (ใช้ใน dev เท่านั้น)
- ไฟล์นี้ **ไม่ต้องแก้ไขแทบเลย** ตลอดชีวิต project

---

## 2. `src/App.jsx` — ตัวกำหนด URL Routes

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';

export default function App() {
    return (
        <AuthProvider>           {/* ห่อทั้งแอปด้วย Auth context */}
            <BrowserRouter>      {/* เปิดใช้งาน URL routing */}
                <Routes>
                    {/* Login — full page, ไม่มี Navbar/Footer */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Main app shell — มี Navbar + Footer */}
                    <Route element={<Layout />}>
                        <Route path="/"           element={<HomePage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
```

### อธิบาย:
- `BrowserRouter` — ทำให้ URL เปลี่ยนได้โดยไม่ reload หน้า (SPA)
- `AuthProvider` — กล่องครอบใหญ่สุด ทำให้ทุก component รู้ว่า user login อยู่ไหม
- `Route path="/"` — เมื่อ URL คือ `/` ให้แสดง `<HomePage />`
- `Route path="/product/:id"` — `:id` คือ **dynamic segment** เช่น `/product/3` จะส่ง `id=3` ให้ page
- `Route element={<Layout />}` — **Nested Route** คือทุก URL ข้างใน จะ render Layout ก่อน แล้วค่อยแสดง page ตรงกลาง

### ทำไม LoginPage ถึงอยู่นอก Layout?
```
Layout = Navbar + {page content} + Footer

หน้า Login มี design ของตัวเอง (split panel)
ไม่ต้องการ Navbar และ Footer ของเว็บหลัก
จึงวางไว้นอก <Route element={<Layout />}>
```

### Concept หลัก: Nested Routes
```
<Route element={<Layout />}>          ← render Layout.jsx ก่อน
  <Route path="/" element={<Page />}> ← Page จะแสดงตรง <Outlet /> ใน Layout
```

---

## คำถามขยายความ สำหรับฝึกตอบ:
1. ถ้าต้องการเพิ่มหน้า `/about` ที่มี Navbar ด้วย จะเพิ่ม Route ที่ไหน?
2. ถ้าต้องการหน้า `/admin` ที่ไม่มี Navbar เลย จะวาง Route ตรงไหน?
3. `:id` ใน `/product/:id` คืออะไร จะดึงค่านั้นมาใช้ใน component ได้ยังไง?
