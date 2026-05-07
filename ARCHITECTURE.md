# BaBaBook — Architecture Guide

คู่มือนี้อธิบาย architecture, โครงสร้างไฟล์, และ data flow ของโปรเจกต์ BaBaBook
เขียนสำหรับคนที่เข้าใจ concept พื้นฐานแล้ว แต่ยังงงภาพรวม

---

## 1. Architecture Overview — มี Layer อะไรบ้าง?

โปรเจกต์นี้ใช้ **3-Layer Architecture** แบบคลาสสิก:

```
┌─────────────────────────────────┐
│         BROWSER (User)          │
│     กด click / กรอกฟอร์ม        │
└──────────────┬──────────────────┘
               │ HTTP Request (JSON/FormData)
               ▼
┌─────────────────────────────────┐
│     FRONTEND — React/Vite       │
│     port 5173 (dev)             │
│  UI → State → Service → Axios   │
└──────────────┬──────────────────┘
               │ REST API calls  (e.g. POST /api/auth/login)
               ▼
┌─────────────────────────────────┐
│   BACKEND — Node.js/Express     │
│   port 5000                     │
│  Router → Controller → Model    │
└──────────────┬──────────────────┘
               │ SQL Query
               ▼
┌─────────────────────────────────┐
│       DATABASE — MySQL          │
│  เก็บ users, books, orders...   │
└─────────────────────────────────┘
```

แต่ละชั้นไม่รู้จักกันตรงๆ ต้องคุยผ่าน "ช่องทาง" ที่กำหนด
Frontend ไม่แตะ DB โดยตรง ต้องผ่าน Backend เสมอ

---

## 2. โครงสร้างไฟล์ — แต่ละอันรับผิดชอบอะไร?

### Entry Points

| ไฟล์ | หน้าที่ |
|------|---------|
| `src/main.jsx` | จุดเริ่มต้นทั้งหมด — mount React app เข้า `<div id="root">` ใน HTML |
| `src/App.jsx` | กำหนด Routes ทั้งหมด + layout หลัก (Navbar, Footer ที่อยู่ทุกหน้า) |

---

### `src/context/` — State ส่วนกลาง

**`AuthContext.jsx`** คือ "สมองกลาง" ของระบบ Login

React Context คือระบบ "ประกาศค่าที่ลูกๆ ทุกคนอ่านได้" โดยไม่ต้อง pass props ทีละชั้น:

```
AuthProvider (ประกาศที่ main.jsx)
  └── App.jsx
        ├── Navbar.jsx       ← อ่าน isLoggedIn ได้
        ├── AuthDrawer.jsx   ← อ่าน authMode ได้
        └── ProtectedRoute   ← อ่าน user.role ได้
```

---

### `src/services/` — ตัวกลางติดต่อ Backend

นี่คือ "แผนก IT" ที่จัดการ HTTP ทั้งหมด:

| ไฟล์ | หน้าที่ |
|------|---------|
| `api.js` | สร้าง Axios instance + แนบ Token อัตโนมัติทุก request |
| `authService.js` | เรียก `/api/auth/login` และ `/api/auth/register` |
| `bookService.js` | เรียก `/api/books` (GET list, GET by id, POST สร้างใหม่) |

`api.js` มี **interceptor** — คิดว่ามันเป็น "ด่านตรวจ" ที่ทุก request ต้องผ่าน
ถ้ามี token ใน localStorage จะแนบ `Authorization: Bearer <token>` ให้อัตโนมัติ

---

### `src/pages/` — หน้าเต็มๆ ที่ผูกกับ URL

| ไฟล์ | URL | ใครเข้าได้ |
|------|-----|-----------|
| `HomePage.jsx` | `/` | ทุกคน |
| `BookDetailPage.jsx` | `/books/:id` | ทุกคน |
| `AddProductPage.jsx` | `/admin/add-product` | Admin เท่านั้น |

---

### `src/components/` — UI ชิ้นเล็กๆ ที่ประกอบกัน

**Layout (อยู่ทุกหน้า)**

| Component | หน้าที่ |
|-----------|---------|
| `Navbar.jsx` | แถบบน (ปุ่ม Login/Logout/ชื่อ user) |
| `Footer.jsx` | ส่วนล่าง |
| `AuthDrawer.jsx` | popup slide-in สำหรับ Login/Register |

**Feature (ใช้เฉพาะที่)**

| Component | หน้าที่ |
|-----------|---------|
| `BookCard.jsx` | การ์ดหนังสือ 1 เล่ม |
| `BookGrid.jsx` | ตาราง + skeleton loading |
| `ProtectedRoute.jsx` | guard ป้องกัน route admin |

---

### `src/hooks/` — Logic ที่แยกออกมาจาก Component

Custom hooks คือ "ฟังก์ชันที่ใช้ React hooks ข้างใน" แยกออกมาให้ component บางเฉา:

| ไฟล์ | หน้าที่ |
|------|---------|
| `useBooks.js` | เรียก `fetchBooks()` + จัดการ loading/error state |
| `useAuth.jsx` | re-export `useAuth` จาก AuthContext (shortcut) |

---

## 3. Data Flow — ถ้า User ทำ X เกิดอะไรขึ้น?

### กรณีที่ 1: User กด "Login"

```
[1] User กรอก email/password แล้วกด Submit
    → AuthDrawer.jsx เรียก login({ email, password })

[2] login() อยู่ใน AuthContext.jsx
    → setIsLoading(true)
    → เรียก loginUser() จาก authService.js

[3] authService.js
    → api.post('/auth/login', { email, password })
    → Interceptor ใน api.js แนบ token (ถ้ามี)

[4] Backend (Node/Express) รับ request
    → ตรวจ email/password กับ MySQL
    → ถ้าถูกต้อง สร้าง JWT token แล้วส่งกลับ

[5] authService.js รับ response
    → return { user: {...}, token: "eyJ..." }

[6] AuthContext.jsx
    → setUser(loggedInUser)         ← React re-render ทุก component
    → localStorage.setItem(token)  ← เก็บไว้ให้ refresh แล้วยังอยู่
    → return { success: true }

[7] Navbar อ่าน isLoggedIn = true
    → แสดงชื่อ user แทนปุ่ม Login ทันที
```

---

### กรณีที่ 2: User เปิดหน้า BookDetail

```
[1] User คลิก URL /books/42
    → React Router จับ route "/books/:id"
    → render BookDetailPage.jsx

[2] BookDetailPage.jsx มี hook
    → เรียก fetchBookById(42) จาก bookService.js

[3] bookService.js
    → api.get('/books/42')
    → Interceptor แนบ token (ถ้า login อยู่)

[4] Backend
    → SELECT * FROM books WHERE id = 42
    → ส่งข้อมูลหนังสือกลับมาเป็น JSON

[5] BookDetailPage.jsx รับข้อมูล
    → setState → React re-render แสดงข้อมูลหนังสือ
```

---

### กรณีที่ 3: Admin พยายามเข้า `/admin/add-product`

```
[1] พิมพ์ URL โดยตรง
    → React Router เจอ Route นั้น
    → แต่ wrapped ด้วย <ProtectedRoute role="admin">

[2] ProtectedRoute.jsx ถาม AuthContext
    → isLoggedIn? ถ้าไม่ → redirect "/"
    → user.role === "admin"? ถ้าไม่ → redirect "/"
    → ผ่านทั้งคู่ → render AddProductPage.jsx
```

---

## ภาพรวมสุดท้าย

```
main.jsx
  └── AuthProvider (ห่อทุกอย่าง — ให้ทุกคนใช้ auth ได้)
        └── App.jsx (กำหนด routes)
              ├── Navbar (อ่าน auth state)
              ├── AuthDrawer (เรียก login/register)
              └── Pages
                    └── ใช้ Services
                          └── ผ่าน api.js (interceptor)
                                └── ↔ Backend API
                                        └── ↔ MySQL
```

**กฎทอง:** Data ไหลทางเดียว — User → Component → Context/Hook → Service → API → Backend → DB
และไหลกลับเส้นเดิม ไม่มีทางลัดข้าม layer
