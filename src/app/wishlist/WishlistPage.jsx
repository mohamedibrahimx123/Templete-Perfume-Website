import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { usePerfumes } from '../../hooks/usePerfumes'
import { useWishlist } from '../../context/WishlistContext'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'
import ProductGrid from '../../components/ProductGrid'
import Breadcrumbs from '../../components/ui/Breadcrumbs'

export default function WishlistPage() {
  const { perfumes } = usePerfumes()
  const { wishlistIds } = useWishlist()
  const { lang } = useLanguage()
  const t = translations[lang].wishlist

  const wishlistProducts = perfumes.filter((p) => wishlistIds.includes(p.id))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-luxury-charcoal dark:text-luxury-cream mb-2">
          {t.title}
        </h1>

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="p-6 rounded-full bg-luxury-sand/30 dark:bg-luxury-dark-border/50 mb-6">
              <Heart size={48} className="text-luxury-charcoal/40 dark:text-luxury-dark-muted" />
            </div>
            <p className="text-xl font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
              {t.empty}
            </p>
            <p className="text-luxury-charcoal/70 dark:text-luxury-dark-muted mb-8">
              {t.emptyDesc}
            </p>
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-luxury-gold text-luxury-charcoal font-semibold hover:bg-luxury-gold/90 transition-colors"
            >
              {t.browseProducts}
            </Link>
          </motion.div>
        ) : (
          <ProductGrid products={wishlistProducts} />
        )}
      </div>
    </motion.div>
  )
}
