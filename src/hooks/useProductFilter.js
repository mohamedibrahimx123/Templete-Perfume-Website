import { useMemo, useState, useEffect } from 'react'

const SORT_OPTIONS = {
  newest: (a, b) => b.id - a.id,
  priceLow: (a, b) => a.price - b.price,
  priceHigh: (a, b) => b.price - a.price,
}

export function useProductFilter(products, brands) {
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [sort, setSort] = useState('newest')

  const filtered = useMemo(() => {
    let result = [...products]

    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      )
    }

    if (brandFilter) {
      result = result.filter((p) => p.brand === brandFilter)
    }

    const min = parseFloat(priceMin)
    const max = parseFloat(priceMax)
    if (!isNaN(min)) result = result.filter((p) => p.price >= min)
    if (!isNaN(max)) result = result.filter((p) => p.price <= max)

    const sortFn = SORT_OPTIONS[sort] || SORT_OPTIONS.newest
    result.sort(sortFn)

    return result
  }, [products, search, brandFilter, priceMin, priceMax, sort])

  const uniqueBrands = useMemo(() => {
    let base = products
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      base = base.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      )
    }
    return [...new Set(base.map((p) => p.brand))].sort()
  }, [products, search])

  useEffect(() => {
    if (brandFilter && !uniqueBrands.includes(brandFilter)) {
      setBrandFilter('')
    }
  }, [uniqueBrands, brandFilter])

  return {
    filtered,
    search,
    setSearch,
    brandFilter,
    setBrandFilter,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    sort,
    setSort,
    uniqueBrands,
  }
}
