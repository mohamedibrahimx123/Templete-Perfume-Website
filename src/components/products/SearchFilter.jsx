import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'

export default function SearchFilter({
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
  t,
}) {
  const { lang } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 space-y-4"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-charcoal/50 dark:text-luxury-dark-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.products.search}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-cream placeholder:text-luxury-charcoal/50 focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-cream focus:ring-2 focus:ring-luxury-gold/50 min-w-[140px]"
          >
            <option value="">{t.products.brand}</option>
            {uniqueBrands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            placeholder={t.products.min}
            min="0"
            step="10"
            className="w-24 px-3 py-3 rounded-xl border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-cream placeholder:text-luxury-charcoal/50 focus:ring-2 focus:ring-luxury-gold/50"
          />
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder={t.products.max}
            min="0"
            step="10"
            className="w-24 px-3 py-3 rounded-xl border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-cream placeholder:text-luxury-charcoal/50 focus:ring-2 focus:ring-luxury-gold/50"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 rounded-xl border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-cream focus:ring-2 focus:ring-luxury-gold/50 min-w-[160px] flex items-center"
          >
            <option value="newest">{t.products.sortNewest}</option>
            <option value="priceLow">{t.products.sortPriceLow}</option>
            <option value="priceHigh">{t.products.sortPriceHigh}</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}
