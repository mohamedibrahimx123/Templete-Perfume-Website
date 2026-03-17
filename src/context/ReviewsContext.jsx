import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'perfume-reviews'

const ReviewsContext = createContext(null)

function loadReviews() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

export function ReviewsProvider({ children }) {
  const [reviewsByProduct, setReviewsByProduct] = useState(loadReviews)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewsByProduct))
  }, [reviewsByProduct])

  const addReview = useCallback((productId, rating, message = '') => {
    const review = { rating, message, date: new Date().toISOString() }
    setReviewsByProduct((prev) => {
      const list = prev[productId] || []
      return { ...prev, [productId]: [...list, review] }
    })
  }, [])

  const getReviews = useCallback((productId) => {
    return reviewsByProduct[productId] || []
  }, [reviewsByProduct])

  const getRating = useCallback((productId, fallbackRating = 4) => {
    const list = reviewsByProduct[productId] || []
    if (list.length === 0) return fallbackRating
    const avg = list.reduce((s, r) => s + r.rating, 0) / list.length
    return Math.round(avg * 10) / 10
  }, [reviewsByProduct])

  const getReviewCount = useCallback((productId) => {
    return (reviewsByProduct[productId] || []).length
  }, [reviewsByProduct])

  return (
    <ReviewsContext.Provider
      value={{ addReview, getReviews, getRating, getReviewCount }}
    >
      {children}
    </ReviewsContext.Provider>
  )
}

export function useReviews() {
  const ctx = useContext(ReviewsContext)
  if (!ctx) throw new Error('useReviews must be used within ReviewsProvider')
  return ctx
}
