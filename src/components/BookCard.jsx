import { Link } from 'react-router-dom'

// คอมโพเนนต์การ์ดแสดงหนังสือ 1 เล่ม
export default function BookCard({ book }) {
  // ดึงข้อมูลที่จำเป็นออกมาจาก object book
  // cover_image_url และ variants ตรงกับ field ที่ Backend ส่งมาตาม spec
  const { id, title, author, variants, cover_image_url } = book

  // ดึงราคาจาก variant แรก (ราคาเริ่มต้น)
  const displayPrice = Number(variants?.[0]?.price ?? 0)

  return (
    // ครอบด้วย Link เพื่อให้กดไปดูรายละเอียดได้
    <Link to={`/books/${id}`} className="flex flex-col group" aria-label={`View ${title}`}>

      {/* ส่วนรูปปกหนังสือ */}
      <div className="relative aspect-[2/3] mb-4 bg-[#EEEEEE] flex items-center justify-center p-6">
        <img
          src={cover_image_url}
          alt={`Cover of ${title}`}
          className="w-full h-full object-cover shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105"
          loading="lazy" // โหลดรูปภาพแบบ Lazy เพื่อประสิทธิภาพที่ดีขึ้น
        />
      </div>

      {/* ข้อมูลหนังสือ */}
      <h3 className="font-serif text-[1.1rem] mb-1 text-text-main">{title}</h3>
      <p className="font-sans text-text-muted text-[0.8rem] mb-2">{author}</p>

      {/* แสดงราคาเริ่มต้นจาก variant แรก (แปลงเป็นตัวเลขก่อนเผื่อ API ส่งมาเป็น String) */}
      <span className="font-sans text-text-muted text-[0.85rem]">฿{displayPrice.toFixed(2)}</span>
    </Link>
  )
}
