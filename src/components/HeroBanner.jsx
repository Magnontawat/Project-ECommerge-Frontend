import { Link } from 'react-router-dom'

// คอมโพเนนต์ส่วนบนสุดของหน้า Home (แบนเนอร์ใหญ่) รองรับ Responsive
export default function HeroBanner() {
  return (
    <section className="py-10 md:py-16 bg-bg-hero overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* ด้านซ้าย - ข้อความและปุ่มกด */}
        <div className="w-full max-w-[450px] mx-auto md:mx-0 text-center md:text-left order-2 md:order-1 mt-6 md:mt-0">
          {/* ป้ายกำกับเล็กๆ */}
          <span className="inline-block px-3 py-1 md:px-4 md:py-1 border border-[#E0E0E0] rounded-full text-[0.7rem] md:text-[0.75rem] text-text-muted mb-4 md:mb-6 bg-transparent">
            Curated Collection
          </span>
          
          {/* หัวข้อหลัก */}
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] mb-4 text-text-main leading-[1.1] font-medium font-serif">
            Discover Your<br className="hidden md:block" />Next Favorite<br className="hidden md:block" />Read.
          </h1>
          
          {/* คำอธิบาย */}
          <p className="text-sm sm:text-base text-text-muted mb-6 md:mb-8 leading-relaxed max-w-[400px] mx-auto md:mx-0">
            Immerse yourself in our carefully selected collection of
            literary masterpieces and contemporary brilliance.
          </p>
          
          {/* ปุ่มกด */}
          <Link to="/" className="inline-flex items-center justify-center font-sans font-medium text-[0.85rem] md:text-[0.9rem] cursor-pointer transition-colors border-none py-[0.6rem] px-[1.5rem] bg-brand text-white hover:bg-brand-hover rounded-sm shadow-sm">
            Explore Now &rarr;
          </Link>
        </div>

        {/* ด้านขวา - รูปภาพตกแต่ง */}
        <div className="w-full order-1 md:order-2">
          <img
            src="/hero-books.png"
            alt="Stack of books"
            className="w-full aspect-square md:aspect-[4/3] object-cover rounded-lg md:rounded-none shadow-md md:shadow-none"
          />
        </div>
      </div>
    </section>
  )
}
