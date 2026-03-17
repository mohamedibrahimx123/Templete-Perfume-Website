import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Star, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { usePerfumes } from '../../hooks/usePerfumes'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useReviews } from '../../context/ReviewsContext'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'
import QuantitySelector from '../../components/ui/QuantitySelector'
import SizeSelector from '../../components/ui/SizeSelector'
import ProductGrid from '../../components/ProductGrid'
import Breadcrumbs from '../../components/ui/Breadcrumbs'
import { useState } from 'react'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=600&fit=crop'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { perfumes } = usePerfumes()
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addReview, getReviews, getRating } = useReviews()
  const { lang } = useLanguage()
  const t = translations[lang].productDetail

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [imgError, setImgError] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewMessage, setReviewMessage] = useState('')

  const product = perfumes.find((p) => p.id === Number(id))
  const sameBrand = perfumes.filter((p) => p.brand === product?.brand && p.id !== product?.id)
  const related = sameBrand.length >= 4
    ? sameBrand.slice(0, 4)
    : [...sameBrand, ...perfumes.filter((p) => p.id !== product?.id && !sameBrand.find((s) => s.id === p.id))].slice(0, 4)

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-24 text-center"
      >
        <p className="text-luxury-charcoal/70 dark:text-luxury-dark-muted">{t.notFound}</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 text-luxury-gold hover:underline"
        >
          {t.backToProducts}
        </button>
      </motion.div>
    )
  }

  const imageSrc = imgError ? FALLBACK_IMAGE : product.image
  const isOutOfStock = product.quantity === 0
  const isComingSoon = product.comingSoon
  const sizes = product.sizes || [{ size: '100ml', price: product.price }]
  const effectiveSize = selectedSize || sizes[0]?.size || '100ml'
  const sizePrice = sizes.find((s) => s.size === effectiveSize)?.price ?? product.price
  const displayRating = getRating(product.id, product.rating)
  const reviews = getReviews(product.id)

  const handleAddToCart = () => {
    if (isOutOfStock || isComingSoon) {
      toast.error(isComingSoon ? t.comingSoonToast : t.outOfStockToast)
      return
    }
    addToCart(product, quantity, effectiveSize)
    toast.success(t.addedToCart)
    setQuantity(1)
    navigate('/cart')
  }

  const handleSubmitReview = () => {
    if (reviewRating < 1 || reviewRating > 5) {
      toast.error(lang === 'ar' ? 'اختر تقييماً من 1 إلى 5' : 'Please select a rating from 1 to 5')
      return
    }
    addReview(product.id, reviewRating, reviewMessage)
    toast.success(lang === 'ar' ? 'تم إضافة تقييمك بنجاح' : 'Review submitted successfully')
    setReviewRating(0)
    setReviewMessage('')
  }

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs productName={product.name} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square max-h-[500px] rounded-2xl overflow-hidden bg-luxury-cream dark:bg-luxury-dark-card"
          >
            <img
              src={imageSrc}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top"
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-luxury-gold text-luxury-charcoal text-sm font-bold">
                -{product.discount}%
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <p className="text-luxury-gold font-semibold uppercase tracking-wider text-sm">
                {product.brand}
              </p>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-luxury-charcoal dark:text-luxury-cream mt-1">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={18}
                      className={
                        s <= Math.floor(displayRating)
                          ? 'fill-luxury-gold text-luxury-gold'
                          : 'text-luxury-sand/50'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-luxury-charcoal/70 dark:text-luxury-dark-muted">
                  {displayRating.toFixed(1)} ({reviews.length || product.reviewCount} {t.reviews})
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              {discountedPrice ? (
                <>
                  <span className="text-2xl font-bold text-luxury-gold">
                    ${(sizePrice * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="text-lg text-luxury-charcoal/50 line-through">
                    ${sizePrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-luxury-charcoal dark:text-luxury-gold">
                  ${sizePrice.toFixed(2)}
                </span>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
                {t.size}
              </p>
              <SizeSelector
                sizes={sizes}
                selected={effectiveSize}
                onChange={setSelectedSize}
              />
            </div>

            <p className="text-luxury-charcoal/80 dark:text-luxury-dark-muted leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={product.quantity}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isOutOfStock || isComingSoon}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-luxury-charcoal dark:bg-luxury-gold text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-luxury-gold dark:hover:bg-luxury-charcoal transition-colors"
              >
                <ShoppingBag size={22} />
                {t.addToCart}
              </motion.button>
            </div>

            {(isOutOfStock || isComingSoon) && (
              <p className="text-amber-600 dark:text-amber-400 text-sm">
                {isComingSoon ? translations[lang].products.comingSoon : translations[lang].products.outOfStock}
              </p>
            )}

            <section className="pt-8 border-t border-luxury-sand dark:border-luxury-dark-border">
              <h3 className="font-serif text-xl font-bold text-luxury-charcoal dark:text-luxury-cream mb-4">
                {t.addReview}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
                    {t.yourRating}
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <motion.button
                        key={s}
                        type="button"
                        onClick={() => setReviewRating(s)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1"
                      >
                        <Star
                          size={28}
                          className={
                            s <= reviewRating
                              ? 'fill-luxury-gold text-luxury-gold'
                              : 'text-luxury-sand/50 hover:text-luxury-gold/70'
                          }
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
                    {t.optionalMessage}
                  </label>
                  <textarea
                    value={reviewMessage}
                    onChange={(e) => setReviewMessage(e.target.value)}
                    placeholder={lang === 'ar' ? 'شارك تجربتك مع هذا العطر...' : 'Share your experience with this fragrance...'}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-cream placeholder:text-luxury-charcoal/50 focus:outline-none focus:ring-2 focus:ring-luxury-gold/50"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitReview}
                  disabled={reviewRating < 1}
                  className="px-6 py-3 rounded-xl bg-luxury-gold text-luxury-charcoal font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-luxury-gold/90 transition-colors"
                >
                  {t.submitReview}
                </motion.button>
              </div>

              {reviews.length > 0 && (
                <div className="mt-8 space-y-3">
                  <h4 className="font-semibold text-luxury-charcoal dark:text-luxury-cream">
                    {reviews.length} {t.reviews}
                  </h4>
                  {reviews.map((r, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-luxury-cream/50 dark:bg-luxury-dark-bg/50 border border-luxury-sand/50 dark:border-luxury-dark-border"
                    >
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={14}
                            className={s <= r.rating ? 'fill-luxury-gold text-luxury-gold' : 'text-luxury-sand/50'}
                          />
                        ))}
                      </div>
                      {r.message && (
                        <p className="text-sm text-luxury-charcoal/80 dark:text-luxury-dark-muted">{r.message}</p>
                      )}
                      <p className="text-xs text-luxury-charcoal/50 mt-1">
                        {new Date(r.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {reviews.length === 0 && (
                <p className="mt-4 text-sm text-luxury-charcoal/60 dark:text-luxury-dark-muted">
                  {t.noReviews}
                </p>
              )}
            </section>
          </motion.div>
        </div>

        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="font-serif text-2xl font-bold text-luxury-charcoal dark:text-luxury-cream mb-8">
              {t.youMayLike}
            </h2>
            <ProductGrid products={related} />
          </motion.section>
        )}
      </div>
    </motion.div>
  )
}
