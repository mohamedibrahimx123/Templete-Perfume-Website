import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'perfume-wishlist'

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds))
  }, [wishlistIds])

  const isInWishlist = (id) => wishlistIds.includes(id)

  const toggleWishlist = (id) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const wishlistCount = wishlistIds.length

  return (
    <WishlistContext.Provider value={{ wishlistIds, isInWishlist, toggleWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
