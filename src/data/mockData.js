// ─── ข้อมูลหนังสือจำลอง (Mock Data) ──────────────────────────────────────
// ใช้สำหรับทดสอบหน้าเว็บ (Frontend) ก่อนที่จะมี API (Backend) ของจริง

export const mockBooks = [
  {
    id: 1,
    title: "The Weight of Ink",
    author: "Rachel Kadish",
    price: 24.00,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    category: "Fiction",
    description: "A sweeping dual-timeline novel about a seventeenth-century scribe and a modern-day historian...",
  },
  {
    id: 2,
    title: "A Little Life",
    author: "Hanya Yanagihara",
    price: 22.50,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    category: "Fiction",
    description: "A novel about the intertwined lives of four college friends in New York City...",
  },
  {
    id: 3,
    title: "Pachinko",
    author: "Min Jin Lee",
    price: 19.00,
    cover: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&q=80",
    category: "Historical Fiction",
    description: "A sweeping saga of a Korean family living in Japan across generations...",
  },
  {
    id: 4,
    title: "Circe",
    author: "Madeline Miller",
    price: 21.00,
    cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=80",
    category: "Fantasy",
    description: "A reimagining of the life of Circe, the enchantress from Homer's Odyssey...",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    price: 22.00,
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80",
    category: "Self-Help",
    description: "A revolutionary system to get 1% better every day...",
  },
  {
    id: 6,
    title: "Normal People",
    author: "Sally Rooney",
    price: 17.50,
    cover: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&q=80",
    category: "Fiction",
    description: "A story about two young people navigating life and love...",
  },
  {
    id: 7,
    title: "Dune",
    author: "Frank Herbert",
    price: 26.00,
    cover: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80",
    category: "Sci-Fi",
    description: "A sci-fi masterpiece set on the desert planet Arrakis...",
  },
  {
    id: 8,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 15.99,
    cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&q=80",
    category: "Fiction",
    description: "A philosophical story about a shepherd boy seeking his treasure...",
  }
];

export const mockCategories = [
  "All",
  "Fiction",
  "Historical Fiction",
  "Fantasy",
  "Sci-Fi",
  "Self-Help",
];
