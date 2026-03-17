import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Sparkles, Heart, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import QuantitySelector from './ui/QuantitySelector'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useReviews } from '../context/ReviewsContext'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../lib/i18n'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=600&fit=crop'

export default function ProductCard({ product, index = 0 }) {
  const [quantity, setQuantity] = useState(1)
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { getRating, getReviewCount } = useReviews()
  const { lang } = useLanguage()
  const t = translations[lang].products
  const navigate = useNavigate()

  const handleAddToCart = (e) => {
    e?.stopPropagation?.()
    if (product.quantity === 0) {
      toast.error(t.outOfStock)
      return
    }
    if (product.comingSoon) {
      toast.error(t.comingSoon)
      return
    }
    const size = product.sizes?.[1]?.size || '100ml'
    addToCart(product, quantity, size)
    toast.success(translations[lang].common.addToCartSuccess)
    setQuantity(1)
    navigate('/cart')
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  const handleCardClick = () => navigate(`/products/${product.id}`)

  const imageSrc = imgError ? FALLBACK_IMAGE : product.image
  const isOutOfStock = product.quantity === 0
  const isComingSoon = product.comingSoon
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -12, transition: { duration: 0.2 } }}
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-luxury-dark-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-luxury-sand/50 dark:border-luxury-dark-border cursor-pointer"
    >
      {/* Image section */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-luxury-cream to-white dark:from-luxury-dark-bg dark:to-luxury-dark-card">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-luxury-sand/30 dark:bg-luxury-dark-border/50 animate-pulse" />
        )}
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 dark:bg-luxury-dark-card/90 backdrop-blur-sm text-xs font-semibold text-luxury-gold uppercase tracking-wider shadow-sm">
            <Sparkles size={12} />
            {product.brand}
          </span>
        </div>

        {product.discount > 0 && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-luxury-gold text-luxury-charcoal text-xs font-bold">
            -{product.discount}%
          </span>
        )}

        {(isOutOfStock || isComingSoon) && (
          <span className="absolute bottom-3 left-3 right-3 text-center py-2 rounded-lg bg-black/60 text-white text-sm font-medium">
            {isComingSoon ? t.comingSoon : t.outOfStock}
          </span>
        )}

        <motion.button
          onClick={handleWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-luxury-dark-card/90 backdrop-blur-sm shadow-sm hover:bg-luxury-gold/20 transition-colors"
        >
          <Heart
            size={20}
            className={
              isInWishlist(product.id)
                ? 'fill-red-500 text-red-500'
                : 'text-luxury-charcoal/70 dark:text-luxury-dark-muted'
            }
          />
        </motion.button>
      </div>

      {/* Content section */}
      <div className="p-5 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div>
          <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-[0.2em]">{product.brand}</p>
          <h3 className="font-serif text-lg font-semibold text-luxury-charcoal dark:text-luxury-cream mt-0.5 line-clamp-2">{product.name}</h3>
          {(() => {
            const rating = getRating(product.id, product.rating)
            const count = getReviewCount(product.id) || product.reviewCount
            return (
              <div className="flex items-center gap-1.5 mt-1">
                <Star size={14} className="fill-luxury-gold text-luxury-gold" />
                <span className="text-xs text-luxury-charcoal/70 dark:text-luxury-dark-muted">
                  {rating.toFixed(1)} ({count})
                </span>
              </div>
            )
          })()}
        </div>

        <div className="flex items-baseline gap-2">
          {discountedPrice ? (
            <>
              <span className="text-xl font-bold text-luxury-charcoal dark:text-luxury-gold">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-sm text-luxury-charcoal/50 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-luxury-charcoal dark:text-luxury-gold">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            max={product.quantity}
          />
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 10px 40px -10px rgba(201, 169, 98, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={isOutOfStock || isComingSoon}
            className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-luxury-charcoal to-luxury-charcoal/90 text-white font-semibold shadow-lg hover:from-luxury-gold hover:to-luxury-gold/90 transition-all duration-300 border border-luxury-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={20} strokeWidth={2} />
            <span>{t.addToCart}</span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
