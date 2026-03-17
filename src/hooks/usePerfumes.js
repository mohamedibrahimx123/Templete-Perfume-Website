import { useState, useEffect, useMemo } from 'react'
import { arabicPerfumes } from '../data/perfumes'

const DUMMYJSON_API = 'https://dummyjson.com/products/category/fragrances'

// Fallback perfume images for API products (DummyJSON may return non-perfume images)
const PERFUME_FALLBACKS = [
  'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop',
]

function mapApiProduct(apiProduct, offsetId, index) {
  const apiImage = apiProduct.images?.[0] || apiProduct.thumbnail
  const isDummyJsonImage = apiImage?.includes('dummyjson.com')
  const image = isDummyJsonImage
    ? PERFUME_FALLBACKS[index % PERFUME_FALLBACKS.length]
    : apiImage
  const quantity = Math.min(apiProduct.stock || 50, 99)
  const price = apiProduct.price
  const sizes = [
    { size: '50ml', price: Math.round(price * 0.6 * 100) / 100 },
    { size: '100ml', price },
    { size: '200ml', price: Math.round(price * 1.7 * 100) / 100 },
  ]
  return {
    id: offsetId + apiProduct.id,
    name: apiProduct.title,
    brand: apiProduct.brand || 'Luxury',
    price,
    image,
    quantity,
    sizes,
    description: apiProduct.description || `Premium ${apiProduct.brand || 'Luxury'} fragrance.`,
    rating: apiProduct.rating ?? 4.5,
    reviewCount: apiProduct.reviews?.length ?? 25,
    discount: 0,
    comingSoon: quantity === 0,
  }
}

export function usePerfumes() {
  const [perfumes, setPerfumes] = useState(arabicPerfumes)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const MIN_LOADING_MS = 800

    const fetchPerfumes = async () => {
      const start = Date.now()
      try {
        const res = await fetch(DUMMYJSON_API)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        const existingKeys = new Set(
          arabicPerfumes.map((p) => `${p.name}|${p.brand}`.toLowerCase())
        )
        const apiProducts = (data.products || [])
          .map((p, i) => mapApiProduct(p, 1000, i))
          .filter((apiP) => {
            const key = `${apiP.name}|${apiP.brand}`.toLowerCase()
            if (existingKeys.has(key)) return false
            existingKeys.add(key)
            return true
          })
        setPerfumes((prev) => {
          const existingIds = new Set(prev.map((p) => p.id))
          const newOnes = apiProducts.filter((p) => !existingIds.has(p.id))
          return [...prev, ...newOnes]
        })
      } catch (err) {
        setError(err.message)
      } finally {
        const elapsed = Date.now() - start
        const remaining = Math.max(0, MIN_LOADING_MS - elapsed)
        setTimeout(() => setLoading(false), remaining)
      }
    }
    fetchPerfumes()
  }, [])

  const uniquePerfumes = useMemo(() => {
    const seen = new Set()
    return perfumes.filter((p) => {
      if (seen.has(p.id)) return false
      seen.add(p.id)
      return true
    })
  }, [perfumes])

  return { perfumes: uniquePerfumes, loading, error }
}
