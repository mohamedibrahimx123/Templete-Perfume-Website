import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import BrandShowcase from '../components/BrandShowcase'
import ProductGrid from '../components/ProductGrid'
import { useCart } from '../context/CartContext'
import { usePerfumes } from '../hooks/usePerfumes'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../lib/i18n'

export default function HomePage() {
  const { cartCount } = useCart()
  const { perfumes } = usePerfumes()
  const { lang } = useLanguage()
  const t = translations[lang].home

  const featuredPerfumes = perfumes.slice(0, 4)
  const featuredIds = new Set(featuredPerfumes.map((p) => p.id))
  const dealsPerfumes = perfumes
    .filter((p) => p.discount > 0 && !featuredIds.has(p.id))
    .slice(0, 4)
  const dealsIds = new Set(dealsPerfumes.map((p) => p.id))
  const bestsellers = [...perfumes]
    .filter((p) => !featuredIds.has(p.id) && !dealsIds.has(p.id))
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <HeroSection />
        <Link to="/cart" className="fixed top-24 right-4 md:right-8 z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-luxury-charcoal dark:bg-luxury-dark-card text-white shadow-lg hover:bg-luxury-gold transition-colors border border-luxury-dark-border"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex items-center justify-center min-w-[22px] h-[22px] px-1 rounded-full bg-luxury-gold text-luxury-charcoal text-sm font-bold"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.div>
        </Link>
      </div>

      <section className="py-16 lg:py-24 bg-luxury-cream dark:bg-luxury-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-luxury-charcoal dark:text-luxury-cream">
              {t.featured}
            </h2>
            <p className="mt-4 text-luxury-charcoal/70 dark:text-luxury-dark-muted max-w-2xl mx-auto">
              {t.featuredDesc}
            </p>
          </motion.div>
          <ProductGrid products={featuredPerfumes} />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 border-2 border-luxury-charcoal dark:border-luxury-gold text-luxury-charcoal dark:text-luxury-cream font-medium rounded-lg hover:bg-luxury-charcoal dark:hover:bg-luxury-gold hover:text-white transition-colors"
              >
                {t.viewAll}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {dealsPerfumes.length > 0 && (
        <section className="py-16 lg:py-24 bg-white dark:bg-luxury-dark-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-luxury-charcoal dark:text-luxury-cream">
                {t.deals}
              </h2>
              <p className="mt-4 text-luxury-charcoal/70 dark:text-luxury-dark-muted max-w-2xl mx-auto">
                {t.dealsDesc}
              </p>
            </motion.div>
            <ProductGrid products={dealsPerfumes} />
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-luxury-cream dark:bg-luxury-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-luxury-charcoal dark:text-luxury-cream">
              {t.bestsellers}
            </h2>
            <p className="mt-4 text-luxury-charcoal/70 dark:text-luxury-dark-muted max-w-2xl mx-auto">
              {t.bestsellersDesc}
            </p>
          </motion.div>
          <ProductGrid products={bestsellers} />
        </div>
      </section>

      <BrandShowcase />
    </motion.div>
  )
}
