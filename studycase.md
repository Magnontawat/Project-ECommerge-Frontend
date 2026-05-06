# Study Case: ไล่ Code การ Login ตั้งแต่ต้นจนจบ

> **เป้าหมาย:** เข้าใจว่าเมื่อ User กดปุ่ม "เข้าสู่ระบบ" แล้ว code วิ่งยังไงบ้าง  
> ตั้งแต่ไฟล์แรกที่เปิดแอป จนถึงการส่ง HTTP request ไป Backend และกลับมาแสดงผล

---

## ภาพรวมก่อนเริ่ม: Code วิ่งกี่ขั้นตอน?

```
[Browser เปิดเว็บ]
      ↓
 1. main.jsx          ← จุดเริ่มต้นของทุกอย่าง
      ↓
 2. AuthProvider      ← ตั้งค่า "ห้องเก็บข้อมูล User" ส่วนกลาง
      ↓
 3. App.jsx           ← วาง Navbar + AuthDrawer ลงหน้าเว็บ
      ↓
[User กดปุ่ม "เข้าสู่ระบบ" ใน Navbar]
      ↓
 4. Navbar.jsx        ← รับ click → เรียก openLogin()
      ↓
 5. AuthContext.jsx   ← openLogin() เปิด Drawer
      ↓
 6. AuthDrawer.jsx    ← แสดงฟอร์ม, User กรอกข้อมูลแล้วกด Submit
      ↓
 7. AuthDrawer.jsx    ← validate ข้อมูล → เรียก login()
      ↓
 8. AuthContext.jsx   ← login() เรียก loginUser() จาก service
      ↓
 9. authService.js    ← loginUser() เรียก api.post()
      ↓
10. api.js            ← Axios ส่ง HTTP POST ไป Backend
      ↓
[Backend ตอบกลับ: { id, username, role, token }]
      ↓
11. authService.js    ← รับ response แล้ง reshape ข้อมูล
      ↓
12. AuthContext.jsx   ← บันทึก user + token, return { success: true }
      ↓
13. AuthDrawer.jsx    ← รับ success → ปิด Drawer
      ↓
[React re-render: Navbar เปลี่ยนจากปุ่ม Login → แสดง Avatar]
```

---

## ขั้นที่ 1: `main.jsx` — จุดเริ่มต้นของแอป

**ไฟล์:** `src/main.jsx`

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
```

### อ่านจากในสุดออกมา (App อยู่ในสุด):

| Component | หน้าที่ |
|---|---|
| `StrictMode` | ตัวช่วยตรวจ bug ขณะ Development (ไม่กระทบ Production) |
| `BrowserRouter` | ให้แอปรู้จัก URL และ Route เช่น `/`, `/books/1` |
| `AuthProvider` | ห้องเก็บข้อมูล User ส่วนกลาง — **ทุก component ข้างในเข้าถึง user ได้** |
| `App` | ตัวแอปจริงๆ ที่วาง Navbar, Page ต่างๆ |

> **สำคัญมาก:** `AuthProvider` ครอบ `App` ไว้ทั้งหมด  
> ดังนั้น **ทุก component ในแอป** สามารถเรียกใช้ข้อมูล user ได้เลย  
> เหมือนกับการประกาศว่า "ข้อมูล user นี้ใครก็ขอดูได้ตลอด"

---

## ขั้นที่ 2: `AuthContext.jsx` — ห้องเก็บข้อมูล User (ตอน Mount)

**ไฟล์:** `src/context/AuthContext.jsx`

ทันทีที่ `AuthProvider` เริ่มทำงาน มันจะตั้งค่า State ต่างๆ ขึ้นมา:

```jsx
export function AuthProvider({ children }) {

  // ── อ่าน localStorage ก่อนเลย (lazy initializer) ──
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('shopter_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      localStorage.removeItem('shopter_user')
      localStorage.removeItem('shopter_token')
      return null
    }
  })
```

### Lazy Initializer คืออะไร?

ปกติ `useState` เขียนแบบนี้:
```js
const [user, setUser] = useState(null)  // กำหนดค่าเริ่มต้นตรงๆ
```

แต่โค้ดนี้ส่ง **ฟังก์ชัน** เข้าไปแทน:
```js
const [user, setUser] = useState(() => {
  // โค้ดในนี้รันครั้งเดียวตอน component สร้างขึ้นมา
  const saved = localStorage.getItem('shopter_user')
  return saved ? JSON.parse(saved) : null
})
```

**ทำไมต้องทำแบบนี้?**  
เพราะต้องการอ่าน localStorage แล้วเอาค่ามาใช้เป็น initial value  
ถ้าใช้ `useEffect` แทน จะมีช่วงสั้นๆ ที่ user = null ก่อน (หน้าเว็บ flash ว่า "ยังไม่ได้ login")  
Lazy initializer ทำให้ user พร้อมตั้งแต่ render ครั้งแรกเลย ไม่มี flash

### State ที่ตั้งไว้ทั้งหมด:

```jsx
const [user, setUser]                   = useState(...)  // ข้อมูล user หรือ null
const [isLoading, setIsLoading]         = useState(false) // กำลังโหลดอยู่ไหม?
const [error, setError]                 = useState(null)  // มี error ไหม?
const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false) // Drawer เปิดอยู่ไหม?
const [authMode, setAuthMode]           = useState('login') // โหมดไหน: login หรือ register?
```

### Context Value ที่ส่งให้ลูกๆ:

```jsx
return (
  <AuthContext.Provider value={{
    user, isLoggedIn, isLoading, error,
    login, register, logout, clearError,
    isAuthDrawerOpen, authMode, setAuthMode,
    openLogin, openRegister, closeAuthDrawer
  }}>
    {children}   {/* ← App และทุก component ข้างใน */}
  </AuthContext.Provider>
)
```

> `children` คือทุกอย่างที่ครอบด้วย `<AuthProvider>...</AuthProvider>`  
> เหมือนกล่องบรรจุของ — AuthProvider เป็นกล่อง, App คือของข้างใน

---

## ขั้นที่ 3: `App.jsx` — โครงสร้างหน้าเว็บ

**ไฟล์:** `src/App.jsx`

```jsx
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />       {/* แถบนำทาง — อยู่บนสุดทุกหน้า */}
      <AuthDrawer />   {/* Drawer Login/Register — ซ่อนอยู่ รอเปิด */}
      <div className="flex-1 pt-[80px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          ...
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
```

### สิ่งสำคัญที่ต้องสังเกต:

- `<AuthDrawer />` อยู่ใน App แต่ **ไม่ได้อยู่ใน Route** — มันอยู่นอก Routes
- นั่นหมายความว่า AuthDrawer โหลดพร้อมกับทุกหน้าตลอดเวลา
- แต่มันจะ **ไม่แสดงผล** จนกว่า `isAuthDrawerOpen` จะเป็น `true`

ดูในไฟล์ `AuthDrawer.jsx`:
```jsx
if (!isAuthDrawerOpen) return null  // ← ถ้า Drawer ไม่ได้เปิดอยู่ ไม่ render อะไรเลย
```

---

## ขั้นที่ 4: `Navbar.jsx` — User กดปุ่ม "เข้าสู่ระบบ"

**ไฟล์:** `src/components/Navbar.jsx`

ก่อนอื่น Navbar ต้องดึงฟังก์ชันจาก Context มาก่อน:

```jsx
export default function Navbar() {
  const { user, isLoggedIn, logout, openLogin, openRegister } = useAuth()
  // useAuth() คือการเปิดกล่อง AuthProvider แล้วหยิบของที่ต้องการออกมา
```

### `useAuth()` คืออะไร?

```jsx
// ไฟล์: src/hooks/useAuth.jsx
export { useAuth } from '../context/AuthContext'

// ไฟล์: src/context/AuthContext.jsx
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth ต้องถูกเรียกใช้ภายใต้ <AuthProvider> เท่านั้น')
  return ctx
}
```

`useContext(AuthContext)` คือการ "เปิดกล่อง" ที่ AuthProvider เตรียมไว้  
ถ้าใช้ `useAuth()` นอก `<AuthProvider>` จะ throw Error ทันที (มีการ guard ไว้)

### ตรวจสอบว่า Login อยู่หรือเปล่า:

```jsx
{isLoggedIn ? (
  <UserDropdown user={user} logout={logout} />  // แสดง Avatar
) : (
  <>
    <button onClick={openLogin}>เข้าสู่ระบบ</button>   {/* ← User กดตรงนี้ */}
    <button onClick={openRegister}>สมัครสมาชิก</button>
  </>
)}
```

- `isLoggedIn` มาจาก `!!user` ใน AuthContext (ถ้า user ไม่ใช่ null = true)
- ถ้ายังไม่ login → แสดงปุ่ม "เข้าสู่ระบบ"
- User กดปุ่ม → เรียก `openLogin()`

---

## ขั้นที่ 5: `AuthContext.jsx` — `openLogin()` เปิด Drawer

**กลับมาที่:** `src/context/AuthContext.jsx`

```jsx
const openLogin = useCallback(() => {
  setAuthMode('login')           // บอกว่าต้องการเปิดในโหมด login (ไม่ใช่ register)
  setIsAuthDrawerOpen(true)      // เปิด Drawer!
  setError(null)                 // ล้าง error เก่าออกก่อน
}, [])
```

### `useCallback` คืออะไร?

```jsx
const openLogin = useCallback(() => { ... }, [])
```

`useCallback` คือการ "จำ" ฟังก์ชัน ไม่ให้สร้างใหม่ทุกครั้งที่ component re-render  
`[]` ท้ายสุดคือ dependency array — ว่างหมายความว่า ฟังก์ชันนี้สร้างครั้งเดียวพอ  
ช่วยประหยัด performance เพราะฟังก์ชันนี้ถูกส่งไปให้ Navbar ใช้

### ผลลัพธ์:

State เปลี่ยนจาก:
```
isAuthDrawerOpen: false
authMode: 'login'
```
เป็น:
```
isAuthDrawerOpen: true   ← เปลี่ยน!
authMode: 'login'
```

React เห็นว่า State เปลี่ยน → **re-render** ทุก component ที่ใช้ค่านี้  
`AuthDrawer` ใช้ `isAuthDrawerOpen` อยู่ → เลยแสดงผลขึ้นมาทันที

---

## ขั้นที่ 6: `AuthDrawer.jsx` — แสดงฟอร์ม Login

**ไฟล์:** `src/components/AuthDrawer.jsx`

```jsx
export default function AuthDrawer() {
  const {
    isAuthDrawerOpen,
    closeAuthDrawer,
    authMode,
    login,          // ← ฟังก์ชัน login จาก Context
    isLoading,
    error,
    clearError
  } = useAuth()    // เปิดกล่อง Context มาใช้

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [fieldErrors, setFieldErrors] = useState({})

  if (!isAuthDrawerOpen) return null  // ← ถ้า Drawer ไม่ได้เปิด หยุดทำงานเลย
```

ตอนนี้ `isAuthDrawerOpen = true` แล้ว → ข้าม `return null` ไป → แสดง UI ฟอร์ม

### User พิมพ์อีเมลและรหัสผ่าน:

```jsx
const handleChange = (e) => {
  const { name, value } = e.target
  // name คือ name attribute ของ input เช่น "email", "password"
  // value คือข้อความที่พิมพ์

  setForm(prev => ({ ...prev, [name]: value }))
  // ...prev คือ spread: คัดลอกทุก field เดิมไว้
  // [name]: value คือ update เฉพาะ field ที่เพิ่งพิมพ์
}
```

ตัวอย่าง: User พิมพ์ email "test@mail.com"
```
form เปลี่ยนจาก: { email: '',          password: '' }
           เป็น: { email: 'test@mail.com', password: '' }
```

### User กดปุ่ม "เข้าสู่ระบบ":

`<button type="submit">` ทำให้ browser เรียก `onSubmit` ของ form:

```jsx
<form onSubmit={handleSubmit}>
```

---

## ขั้นที่ 7: `AuthDrawer.jsx` — `handleSubmit()` และ Validate

```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  // e.preventDefault() สำคัญมาก!
  // browser ปกติจะ reload หน้าเมื่อ submit form
  // เราไม่ต้องการแบบนั้น — เลยบอกให้หยุดพฤติกรรมเดิม

  const errs = validate()   // ตรวจสอบข้อมูลก่อน
  if (Object.keys(errs).length > 0) {
    setFieldErrors(errs)    // ถ้ามี error → แสดง error ใต้ input
    return                  // หยุดทำงาน ไม่ส่งไป backend
  }
  ...
}
```

### ฟังก์ชัน `validate()` ทำงานยังไง?

```jsx
const validate = () => {
  const errs = {}   // object เปล่าสำหรับเก็บ error

  // โหมด register เท่านั้น ต้องมี username
  if (authMode === 'register' && !form.username.trim())
    errs.username = 'กรุณากรอกชื่อผู้ใช้'

  // email ต้องมีและต้องถูกรูปแบบ
  if (!form.email.trim())
    errs.email = 'กรุณากรอกอีเมล'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errs.email = 'อีเมลไม่ถูกต้อง'
  // Regex นี้ตรวจว่ามี @ และ . อยู่ถูกตำแหน่ง

  // password ต้องมีและยาวพอ
  if (!form.password)
    errs.password = 'กรุณากรอกรหัสผ่าน'
  else if (form.password.length < 5)
    errs.password = 'อย่างน้อย 5 ตัวอักษร'

  return errs   // ถ้าไม่มี error errs จะเป็น {} object เปล่า
}
```

ถ้าผ่านการ validate ทุกอย่าง → ไปต่อ:

```jsx
let result
if (authMode === 'login') {
  result = await login({ email: form.email, password: form.password })
  //       ↑ await หมายความว่า "รอให้ login() ทำงานเสร็จก่อน แล้วค่อยไปบรรทัดถัดไป"
}
```

---

## ขั้นที่ 8: `AuthContext.jsx` — ฟังก์ชัน `login()`

**กลับมาที่:** `src/context/AuthContext.jsx`

```jsx
const login = useCallback(async ({ email, password }) => {
  setIsLoading(true)   // บอกให้ UI แสดง loading spinner
  setError(null)       // ล้าง error เก่า

  try {
    // เรียก loginUser() จาก authService.js
    // destructuring: แยก user และ token ออกจาก object ที่ return มา
    const { user: loggedInUser, token } = await loginUser({ email, password })

    setUser(loggedInUser)   // บันทึก user ลง State
    localStorage.setItem('shopter_user', JSON.stringify(loggedInUser))
    // JSON.stringify แปลง object → string เพราะ localStorage เก็บได้แค่ string
    localStorage.setItem('shopter_token', token)

    return { success: true }   // บอก AuthDrawer ว่า login สำเร็จ

  } catch (err) {
    // ถ้า loginUser() throw Error → จะมาที่นี่
    setError(err.message)      // แสดง error ใน Drawer
    return { success: false, message: err.message }

  } finally {
    // finally รันเสมอ ไม่ว่าจะ try สำเร็จหรือ catch error
    setIsLoading(false)        // ปิด loading spinner
  }
}, [])
```

### `try / catch / finally` คืออะไร?

เหมือนการ "ลองทำ แล้วถ้าพัง จัดการด้วยวิธีนี้":

```
try {
  โค้ดที่อาจเกิด error    ← ลองทำ
}
catch (err) {
  โค้ดรับมือ error       ← ถ้าพัง ทำแบบนี้
}
finally {
  โค้ดที่ต้องทำเสมอ      ← ไม่ว่าจะเกิดอะไร ทำตรงนี้ก่อน
}
```

---

## ขั้นที่ 9: `authService.js` — เตรียม HTTP Request

**ไฟล์:** `src/services/authService.js`

```jsx
export async function loginUser({ email, password }) {
  try {
    const response = await api.post('/auth/login', { email, password })
    // api.post คือการส่ง HTTP POST ไปที่ /auth/login
    // body ของ request คือ { email, password }

    // reshape: เลือกเฉพาะ field ที่ต้องการจาก response
    return {
      user: {
        id: response.data.id,
        username: response.data.username,
        role: response.data.role,
        level: response.data.level
        // email ไม่ได้เก็บไว้ตอน login (backend ไม่ส่งมา)
      },
      token: response.data.token,
    }
  } catch (error) {
    // error.response คือ HTTP response จาก backend (ถ้ามี)
    // error.response?.data?.message → Optional Chaining: ถ้า path ไหน undefined ก็ return undefined แทน crash
    const message = error.response?.data?.message || 'Login failed. Please check your credentials.'
    throw new Error(message)   // โยน error กลับไปให้ AuthContext จัดการ
  }
}
```

### Optional Chaining `?.` คืออะไร?

```js
error.response?.data?.message
```

เหมือนการบอกว่า "ถ้า response มีอยู่ ก็เข้าไปดู data ถ้า data มีอยู่ ก็เข้าไปดู message"  
ถ้าจุดไหนเป็น `undefined` ก็หยุดเลย ไม่ crash  

เทียบกับการเขียนแบบเก่า (ยาวกว่ามาก):
```js
// แบบเก่า (ไม่มี optional chaining)
let message
if (error.response && error.response.data && error.response.data.message) {
  message = error.response.data.message
} else {
  message = 'Login failed...'
}
```

---

## ขั้นที่ 10: `api.js` — Axios ส่ง HTTP Request จริงๆ

**ไฟล์:** `src/services/api.js`

```js
import axios from 'axios'

// สร้าง Axios instance พร้อม config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
```

### `import.meta.env.VITE_API_URL` คืออะไร?

Vite (เครื่องมือ build) อ่านค่าจากไฟล์ `.env`:
```
VITE_API_URL=http://localhost:5000/api
```
ถ้าไม่มีค่านี้ (หรือไฟล์ .env หายไป) → fallback ใช้ `http://localhost:5000/api` แทน

`Content-Type: application/json` บอก backend ว่า "เราส่ง JSON มานะ"

### Request Interceptor — ฮีโร่ที่ซ่อนอยู่

```js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('shopter_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

**Interceptor = ด่านตรวจที่ทุก Request ต้องผ่าน**

```
[เรียก api.post()]
      ↓
[ด่าน Interceptor]  ← เพิ่ม Authorization header อัตโนมัติ
      ↓
[ส่งไป Backend จริงๆ]
```

ครั้งแรกที่ login ยังไม่มี token → ส่งแบบไม่มี Authorization ไป  
แต่หลัง login แล้ว ทุก request ต่อไปจะมี token ติดไปด้วยอัตโนมัติ  
ทำให้ไม่ต้องเขียน `Authorization: Bearer xxx` ซ้ำในทุก service

### Request ที่ส่งไป Backend จริงๆ มีหน้าตายังไง?

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@mail.com",
  "password": "mypassword"
}
```

---

## ขั้นที่ 11: Backend ตอบกลับ → `authService.js` รับข้อมูล

สมมติ Backend ส่ง Response กลับมาแบบนี้ (HTTP 200 OK):

```json
{
  "id": 42,
  "username": "art_enthusiast",
  "email": "test@mail.com",
  "role": "user",
  "level": 1,
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

`authService.js` รับ response → ทำ reshape (เลือกแค่ field ที่ต้องการ):

```js
return {
  user: {
    id: response.data.id,           // 42
    username: response.data.username, // "art_enthusiast"
    role: response.data.role,        // "user"
    level: response.data.level       // 1
  },
  token: response.data.token        // "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### ทำไมต้อง reshape?

เราไม่เก็บ email และ field อื่นที่ไม่จำเป็นไว้ใน State  
เพื่อความสะอาด และหลีกเลี่ยงการเก็บข้อมูลส่วนเกินใน localStorage  

---

## ขั้นที่ 12: `AuthContext.jsx` — บันทึกข้อมูล User

กลับมาที่ฟังก์ชัน `login()`:

```js
const { user: loggedInUser, token } = await loginUser({ email, password })
//     ↑ destructuring + rename: user → loggedInUser เพื่อไม่ชนกับ state ชื่อ user
```

```js
setUser(loggedInUser)
// React State เปลี่ยน → จะ trigger re-render ทุก component ที่ใช้ user
```

```js
localStorage.setItem('shopter_user', JSON.stringify(loggedInUser))
localStorage.setItem('shopter_token', token)
// เก็บลง localStorage ไว้ด้วย
// เพื่อให้ยัง login อยู่แม้ refresh หน้าเว็บ
```

### ทำไม Token ต้องเก็บแยก?

`shopter_user` เก็บ object ข้อมูลผู้ใช้ (JSON string)  
`shopter_token` เก็บ token string ตรงๆ  

ตอนส่ง request ถัดไป `api.js` ดึงแค่ token มาใส่ header ได้เลย โดยไม่ต้อง parse JSON

---

## ขั้นที่ 13: กลับมาที่ `AuthDrawer.jsx` — ปิด Drawer

```jsx
const result = await login({ email: form.email, password: form.password })

if (result.success) {
  closeAuthDrawer()   // login สำเร็จ → ปิด Drawer
}
```

`closeAuthDrawer()`:
```js
const closeAuthDrawer = useCallback(() => {
  setIsAuthDrawerOpen(false)   // ปิด Drawer
}, [])
```

---

## ขั้นที่ 14: React Re-render — หน้าเว็บอัปเดตอัตโนมัติ

State ที่เปลี่ยนไปทั้งหมด:

```
user:             null  →  { id: 42, username: 'art_enthusiast', role: 'user', level: 1 }
isLoggedIn:       false →  true
isAuthDrawerOpen: true  →  false
isLoading:        true  →  false (finally block)
```

React เห็นว่า State เปลี่ยน → re-render components ที่ใช้ค่าเหล่านี้:

**Navbar:**
```jsx
{isLoggedIn ? (
  <UserDropdown user={user} logout={logout} />  // ← แสดงนี้แทน!
) : (
  <button onClick={openLogin}>เข้าสู่ระบบ</button>
)}
```

ผลลัพธ์ที่เห็น: ปุ่ม "เข้าสู่ระบบ" หายไป → Avatar ตัวอักษรย่อปรากฏขึ้นมาแทน

---

## สรุปภาพรวมทั้งหมดในรูป Diagram

```
User กดปุ่ม "เข้าสู่ระบบ"
          │
          ▼
   Navbar.jsx
   onClick={openLogin}
          │
          ▼
   AuthContext.jsx
   openLogin() → setIsAuthDrawerOpen(true)
          │
          │ React re-render
          ▼
   AuthDrawer.jsx
   แสดงฟอร์ม (isAuthDrawerOpen = true)
          │
          │ User กรอกข้อมูลและกด Submit
          ▼
   AuthDrawer.jsx
   handleSubmit() → validate() → ผ่าน!
          │
          │ เรียก login()
          ▼
   AuthContext.jsx
   login() → setIsLoading(true) → เรียก loginUser()
          │
          ▼
   authService.js
   loginUser() → api.post('/auth/login', { email, password })
          │
          ▼
   api.js (Axios)
   ผ่าน Interceptor → ส่ง HTTP POST
          │
          │ Network request ออกไป
          ▼
   ═══════════════════════
      Backend Server
   ═══════════════════════
          │
          │ Response กลับมา: { id, username, role, token }
          ▼
   authService.js
   reshape → return { user, token }
          │
          ▼
   AuthContext.jsx
   setUser(loggedInUser)
   localStorage.setItem(...)
   return { success: true }
          │
          ▼
   AuthDrawer.jsx
   result.success → closeAuthDrawer()
          │
          │ React re-render (state เปลี่ยน)
          ▼
   Navbar.jsx
   isLoggedIn = true → แสดง Avatar
```

---

## กรณีที่ Login ล้มเหลว (Error Case)

ถ้า Backend ตอบกลับด้วย HTTP 401 หรือ 400:

```js
// authService.js
} catch (error) {
  const message = error.response?.data?.message || 'Login failed. Please check your credentials.'
  throw new Error(message)   // โยน error กลับ
}
```

```js
// AuthContext.jsx login()
} catch (err) {
  setError(err.message)               // เก็บ error message ลง State
  return { success: false }
}
```

```jsx
// AuthDrawer.jsx แสดง error
{error && (
  <div className="bg-red-50 text-red-600 ...">
    {error}   {/* แสดงข้อความ error ใต้ form */}
  </div>
)}
```

---

## Concept สำคัญที่ใช้ในกระบวนการ Login

| Concept | ใช้ที่ไหน | อธิบาย |
|---|---|---|
| `React Context` | AuthContext.jsx | ห้องเก็บข้อมูลส่วนกลางที่ทุก component เข้าถึงได้ |
| `useState lazy initializer` | AuthContext.jsx | อ่าน localStorage ตอน mount โดยไม่มี flash |
| `useCallback` | AuthContext.jsx | จำฟังก์ชันไว้ ไม่สร้างใหม่ทุก render |
| `useContext` | useAuth() | "เปิดกล่อง" Context เอาข้อมูลออกมาใช้ |
| `async/await` | login(), loginUser() | รอ async operation เสร็จก่อนไปต่อ |
| `try/catch/finally` | login(), loginUser() | จัดการ error และ cleanup |
| `e.preventDefault()` | handleSubmit() | ป้องกัน browser reload หน้าเมื่อ submit form |
| `Axios interceptor` | api.js | ดักทุก request แนบ token อัตโนมัติ |
| `Optional chaining ?.` | authService.js | อ่าน nested property อย่างปลอดภัย |
| `localStorage` | AuthContext.jsx | เก็บ session ไว้แม้ refresh หน้า |
| `Destructuring` | login(), Navbar | แยก property จาก object ได้ด้วยชื่อ |
| `Spread operator ...` | handleChange() | copy object แล้ว update เฉพาะ field ที่ต้องการ |
