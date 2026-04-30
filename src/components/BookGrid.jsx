import BookCard from './BookCard'

// คอมโพเนนต์ตารางแสดงหนังสือ (รองรับ Responsive: มือถือ 2 คอลัมน์, แท็บเล็ต 3, คอมพิวเตอร์ 4)
export default function BookGrid({ books, loading }) {
  
  // กรณีที่กำลังโหลดข้อมูล จะแสดงโครงร่างหลอกๆ (Skeleton Loading)
  if (loading) {
    return (
      <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* สร้างกล่องเปล่าๆ 8 กล่องขึ้นมาแสดงเป็นโครงกระดูกไปก่อน */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <div className="skeleton aspect-[2/3] mb-4 rounded-md" />
            <div className="flex flex-col flex-1">
              <div className="skeleton h-4 mb-2 w-1/2 rounded-sm" />
              <div className="skeleton h-4 w-full rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // กรณีที่ไม่มีหนังสือในระบบเลย
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-16 text-text-muted">
        <span className="text-4xl md:text-5xl block mb-4">📭</span>
        <p className="text-sm md:text-base">No books found.</p>
      </div>
    )
  }

  // วนลูปสร้างคอมโพเนนต์ BookCard จากข้อมูลหนังสือที่มี
  return (
    <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
