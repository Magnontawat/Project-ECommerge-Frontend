// ---------------------------------------------------------------------------
// mock.js  — Shopter mock data
// createdAt format: ISO 8601 string (will be replaced by DB timestamps later)
//
// โครงสร้าง: สินค้าทั้งหมดอยู่ใน ALL_PRODUCTS (คลังสินค้ารวม)
// - WEEKLY_EDIT_MAIN / WEEKLY_EDIT_GRID / NEW_ARRIVALS ดึงมาจาก ALL_PRODUCTS
// - อนาคตแทนด้วย API endpoint แต่ละตัวที่ backend กรองมาให้แล้ว
// ---------------------------------------------------------------------------

export const ALL_PRODUCTS = [
  // ── id 1–4: สินค้าชุดแรก (new arrivals เดิม) ──────────────────────────
  {
    id: 1,
    name: "Aura Ambient Light",
    category: "LIVING",
    options: ["Standard", "Large"],
    price: 245.00,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-01T08:00:00Z",
  },
  {
    id: 2,
    name: "Sonic Artistry Gen 2",
    category: "AUDIO",
    options: ["Matte Black", "Lunar White", "Midnight Blue"],
    price: 499.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-03T10:30:00Z",
  },
  {
    id: 3,
    name: "Vantage Focus II",
    category: "CREATIVE",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-05T14:00:00Z",
  },
  {
    id: 4,
    name: "Lunar Ceramic Chrono",
    category: "LUXURY",
    price: 345.00,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-07T09:00:00Z",
  },

  // ── id 5–8: weekly edit grid ────────────────────────────────────────────
  {
    id: 5,
    name: "Lunar Ceramic Timepiece",
    category: "ACCESSORIES",
    price: 345.00,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-08T11:00:00Z",
  },
  {
    id: 6,
    name: "Sonic Studio Pro 4",
    category: "AUDIO",
    options: ["Matte Black", "Lunar White", "Midnight Blue"],
    price: 299.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-09T13:45:00Z",
  },
  {
    id: 7,
    name: "Retrospect 35mm Lens",
    category: "OPTICS",
    price: 510.00,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-11T08:20:00Z",
  },
  {
    id: 8,
    name: "Azure Eau de Parfum",
    category: "FRAGRANCE",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-12T16:00:00Z",
  },

  // ── id 9: weekly edit main (featured) ───────────────────────────────────
  {
    id: 9,
    name: "Velocity Elite X1",
    category: "PERFORMANCE",
    options: ["US 7", "US 8", "US 9", "US 10"],
    price: 189.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    badge: "BEST SELLER",
    createdAt: "2024-06-10T07:00:00Z",
  },

  // ── id 10–12: สินค้าใหม่เพิ่มเติม (เพื่อให้ scroll section มีของมากพอ) ──
  {
    id: 10,
    name: "Matte Black Tumbler",
    category: "LIFESTYLE",
    price: 58.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-13T09:00:00Z",
  },
  {
    id: 11,
    name: "Heritage Canvas Tote",
    category: "FASHION",
    options: ["US 7", "US 8", "US 9", "US 10"],
    price: 89.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-14T11:30:00Z",
  },
  {
    id: 12,
    name: "Drift Wireless Speaker",
    category: "AUDIO",
    options: ["Matte Black", "Lunar White", "Midnight Blue"],
    price: 219.00,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-15T08:00:00Z",
  },
  {
    id: 13,
    name: "Obsidian Desk Lamp",
    category: "LIVING",
    options: ["Standard", "Large"],
    price: 175.00,
    image: "https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-16T10:00:00Z",
  },
  {
    id: 14,
    name: "Alpine Snow Boots",
    category: "FASHION",
    options: ["US 7", "US 8", "US 9", "US 10"],
    price: 320.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-17T07:30:00Z",
  },
  {
    id: 15,
    name: "Prism Glass Carafe",
    category: "LIVING",
    options: ["Standard", "Large"],
    price: 66.00,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-18T13:00:00Z",
  },
  {
    id: 16,
    name: "Studio Monitor Pro",
    category: "AUDIO",
    options: ["Matte Black", "Lunar White", "Midnight Blue"],
    price: 780.00,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-19T15:00:00Z",
  },
  {
    id: 17,
    name: "Hammered Copper Mug",
    category: "LIFESTYLE",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-20T09:45:00Z",
  },
  {
    id: 18,
    name: "Carbon Fibre Wallet",
    category: "ACCESSORIES",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-21T08:00:00Z",
  },
  {
    id: 19,
    name: "Minimalist Desk Pad",
    category: "WORKSPACE",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-22T10:00:00Z",
  },
  {
    id: 20,
    name: "Ergonomic Task Chair",
    category: "FURNITURE",
    options: ["Standard", "Large"],
    price: 450.00,
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-23T09:00:00Z",
  },
  {
    id: 21,
    name: "Smart Thermostat",
    category: "HOME",
    options: ["Standard", "Large"],
    price: 199.00,
    image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-24T14:30:00Z",
  },
  {
    id: 22,
    name: "Mechanical Keyboard",
    category: "ELECTRONICS",
    options: ["Matte Black", "Lunar White", "Midnight Blue"],
    price: 150.00,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-25T11:15:00Z",
  },
  {
    id: 23,
    name: "Wireless Charging Pad",
    category: "ACCESSORIES",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-26T16:45:00Z",
  },
  {
    id: 24,
    name: "Premium Yoga Mat",
    category: "WELLNESS",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-27T08:20:00Z",
  },
  {
    id: 25,
    name: "Ceramic Pour-Over Set",
    category: "KITCHEN",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-28T07:10:00Z",
  },
  {
    id: 26,
    name: "Noise-Cancelling Earbuds",
    category: "AUDIO",
    options: ["Matte Black", "Lunar White", "Midnight Blue"],
    price: 249.00,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-29T13:00:00Z",
  },
  {
    id: 27,
    name: "Linen Throw Blanket",
    category: "HOME",
    options: ["Standard", "Large"],
    price: 110.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-06-30T10:00:00Z",
  },
  {
    id: 28,
    name: "Portable Power Bank",
    category: "ACCESSORIES",
    price: 55.00,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-07-01T09:30:00Z",
  },
  {
    id: 29,
    name: "Smart Watch",
    category: "ELECTRONICS",
    options: ["Matte Black", "Lunar White", "Midnight Blue"],
    price: 320.00,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-07-02T15:45:00Z",
  },
  {
    id: 30,
    name: "Leather Messenger Bag",
    category: "FASHION",
    options: ["US 7", "US 8", "US 9", "US 10"],
    price: 210.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"],
    description: "Designed for the modern sanctuary, this piece combines sculptural precision with unparalleled comfort. Each item is hand-finished utilizing high-density materials that defy traditional silhouettes.",
    createdAt: "2024-07-03T11:20:00Z",
  },
];

// ---------------------------------------------------------------------------
// ส่วนที่ใช้ใน component / section ต่างๆ
// อนาคตตรงนี้จะถูกแทนด้วย API call ใน hook แต่ละตัว
// ---------------------------------------------------------------------------

// NEW_ARRIVALS — 4 อันดับแรกที่เพิ่มเข้ามาในระบบ (sort by createdAt)
export const NEW_ARRIVALS = [...ALL_PRODUCTS]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 4);

// WEEKLY_EDIT_MAIN — สินค้า featured (มี badge) อันสุดท้าย
export const WEEKLY_EDIT_MAIN = ALL_PRODUCTS.find(p => p.badge) ?? ALL_PRODUCTS[0];

// WEEKLY_EDIT_GRID — สินค้า 4 ชิ้นที่ไม่ใช่ featured
export const WEEKLY_EDIT_GRID = ALL_PRODUCTS
  .filter(p => !p.badge)
  .slice(0, 4);

// SUGGESTED_PRODUCTS — สินค้าทั้งหมดสำหรับ horizontal scroll
// อนาคต: backend จะส่งมาสูงสุด 12 ชิ้น (เรียงตาม relevance / random)
export const SUGGESTED_PRODUCTS = [...ALL_PRODUCTS]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 12);
