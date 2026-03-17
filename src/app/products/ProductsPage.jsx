import { motion } from 'framer-motion'
import ProductGrid from '../../components/ProductGrid'
import ProductCardSkeleton from '../../components/ui/ProductCardSkeleton'
import SearchFilter from '../../components/products/SearchFilter'
import { usePerfumes } from '../../hooks/usePerfumes'
import { useProductFilter } from '../../hooks/useProductFilter'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'

export default function ProductsPage() {
  const { perfumes, loading, error } = usePerfumes()
  const { lang } = useLanguage()
  const t = translations[lang]
  const {
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
  } = useProductFilter(perfumes)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-luxury-charcoal dark:text-luxury-cream">
            {t.products.title}
          </h1>
          <p className="mt-2 text-luxury-charcoal/70 dark:text-luxury-dark-muted">
            {t.products.desc}
          </p>
        </motion.div>

        {!loading && (
          <SearchFilter
              search={search}
              setSearch={setSearch}
              brandFilter={brandFilter}
              setBrandFilter={setBrandFilter}
              priceMin={priceMin}
              setPriceMin={setPriceMin}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              sort={sort}
              setSort={setSort}
              uniqueBrands={uniqueBrands}
              t={t}
            />
        )}

        {error && (
            <div className="text-center py-12 text-amber-600 dark:text-amber-400">
              {t.products.failedToLoad}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <p className="text-center py-16 text-luxury-charcoal/70 dark:text-luxury-dark-muted">
              {t.products.noResults}
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ProductGrid products={filtered} />
          )}
      </div>
    </motion.div>
  )
}
