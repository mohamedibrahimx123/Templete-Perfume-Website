import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import QuantitySelector from '../../components/ui/QuantitySelector'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()
  const { lang } = useLanguage()
  const t = translations[lang].cart
  const navigate = useNavigate()

  const handleCheckout = () => navigate('/checkout')

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="py-16 lg:py-24"
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-luxury-cream dark:bg-luxury-dark-card text-luxury-gold mb-6"
          >
            <ShoppingBag size={48} />
          </motion.div>
          <h2 className="font-serif text-2xl font-bold text-luxury-charcoal dark:text-luxury-cream">{t.empty}</h2>
          <p className="mt-2 text-luxury-charcoal/70 dark:text-luxury-dark-muted">{t.emptyDesc}</p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 px-8 py-3 bg-luxury-charcoal dark:bg-luxury-dark-card text-white rounded-lg hover:bg-luxury-gold transition-colors font-medium"
            >
              {t.browseProducts}
            </motion.button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="py-12 lg:py-16"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-luxury-charcoal dark:text-luxury-cream">
            {t.title}
          </h1>
          <p className="mt-2 text-luxury-charcoal/70 dark:text-luxury-dark-muted">
            {cartItems.length} {cartItems.length === 1 ? t.itemsInCart : t.itemsInCartPlural}
          </p>
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size || '100ml'}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex gap-4 p-4 bg-white dark:bg-luxury-dark-card rounded-2xl border border-luxury-sand dark:border-luxury-dark-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-luxury-cream dark:bg-luxury-dark-bg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-luxury-gold uppercase">{item.brand}</p>
                  <h3 className="font-serif font-semibold text-luxury-charcoal dark:text-luxury-cream truncate">{item.name}</h3>
                  {item.size && (
                    <p className="text-xs text-luxury-charcoal/70 dark:text-luxury-dark-muted">{item.size}</p>
                  )}
                  <p className="text-lg font-semibold text-luxury-gold mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.id, q, item.size || '100ml')}
                      max={99}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFromCart(item.id, item.size || '100ml')}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
                      aria-label={t.remove}
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-6 bg-white dark:bg-luxury-dark-card rounded-2xl border border-luxury-sand dark:border-luxury-dark-border"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium text-luxury-charcoal dark:text-luxury-cream">{t.total}</span>
            <span className="text-2xl font-bold text-luxury-gold">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              className="flex-1 px-6 py-4 bg-luxury-charcoal dark:bg-luxury-dark-card text-white font-medium rounded-lg hover:bg-luxury-gold transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              {t.proceedToCheckout}
            </motion.button>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 border-2 border-luxury-charcoal dark:border-luxury-gold text-luxury-charcoal dark:text-luxury-cream font-medium rounded-lg hover:bg-luxury-cream dark:hover:bg-luxury-dark-bg transition-colors"
              >
                {t.continueShopping}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
