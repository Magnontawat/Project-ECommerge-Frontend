import { Link } from 'react-router-dom'

// คอมโพเนนต์ส่วนท้ายของเว็บ (Footer) รองรับ Responsive
export default function Footer() {
  return (
    <footer className="bg-bg-main py-6 md:py-8 border-t border-border-color mt-8 md:mt-16">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-[0.75rem] md:text-[0.8rem] text-text-muted gap-4 md:gap-0">
        {/* โลโก้แบรนด์ด้านซ้าย */}
        <Link to="/" className="font-serif text-[1.1rem] md:text-[1.2rem] font-bold text-text-main mb-2 md:mb-0">BaBaBook</Link>

        {/* เมนูลิงก์ต่างๆ ตรงกลาง */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-2 md:mb-0">
          <Link to="/" className="hover:text-text-main transition-colors">เกี่ยวกับเรา</Link>
          <Link to="/" className="hover:text-text-main transition-colors">ติดต่อเรา</Link>
          <Link to="/" className="hover:text-text-main transition-colors">การจัดส่ง</Link>
          <Link to="/" className="hover:text-text-main transition-colors">การคืนสินค้า</Link>
          <Link to="/" className="hover:text-text-main transition-colors">นโยบายความเป็นส่วนตัว</Link>
        </nav>

        {/* ลิขสิทธิ์ด้านขวา (ดึงปีปัจจุบันมาแสดงอัตโนมัติ) */}
        <p className="text-center md:text-right">&copy; {new Date().getFullYear()} BaBaBook. สงวนลิขสิทธิ์</p>
      </div>
    </footer>
  )
}
