import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchBookById } from '../services/api'

export default function BookDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true)
        window.scrollTo(0, 0)
        const data = await fetchBookById(id)
        if (data) {
          setBook(data)
        } else {
          setError('Book not found')
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch book details')
      } finally {
        setLoading(false)
      }
    }

    getBook()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen py-24 bg-bg-main flex items-center justify-center">
        <div className="text-text-muted text-lg animate-pulse">Loading book details...</div>
      </main>
    )
  }

  if (error || !book) {
    return (
      <main className="min-h-screen py-24 bg-bg-main flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-serif text-text-main">Book Not Found</h1>
        <Link to="/" className="text-brand hover:underline">&larr; Back to Home</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-10 md:py-20 bg-bg-main">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Breadcrumb / Back button */}
        <Link to="/" className="inline-block mb-8 text-[0.85rem] text-text-muted hover:text-text-main transition-colors">
          &larr; Back to Collection
        </Link>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          
          {/* Left: Book Cover */}
          <div className="w-full md:w-2/5 shrink-0 bg-[#EEEEEE] flex items-center justify-center p-8 md:p-12 aspect-[2/3] relative">
            <img 
              src={book.cover} 
              alt={`Cover of ${book.title}`} 
              className="w-full h-full object-cover shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
            />
          </div>

          {/* Right: Book Details */}
          <div className="w-full md:w-3/5 flex flex-col pt-4 md:pt-8">
            <span className="inline-block uppercase tracking-widest text-[0.75rem] text-text-muted mb-4">
              {book.category}
            </span>
            
            <h1 className="text-3xl md:text-5xl font-serif text-text-main mb-2 leading-tight">
              {book.title}
            </h1>
            
            <p className="text-lg md:text-xl text-text-muted font-sans mb-6">
              by {book.author}
            </p>
            
            <div className="text-2xl font-sans text-text-main mb-8">
              ${Number(book.price).toFixed(2)}
            </div>
            
            <div className="mb-10 text-text-muted leading-relaxed font-sans max-w-[600px]">
              {book.description || "No description available for this book."}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-brand text-white font-sans text-[0.9rem] rounded-sm hover:bg-brand-hover transition-colors shadow-sm">
                Add to Cart
              </button>
              <button className="px-8 py-3 border border-border-color text-text-main bg-transparent font-sans text-[0.9rem] rounded-sm hover:bg-[#F0F0F0] transition-colors">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
