import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { lang } = useLanguage()
  const t = translations[lang].checkout
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    governorate: '',
    city: '',
    postalCode: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success(t.orderSuccess)
    clearCart()
    navigate('/')
  }

  if (cartItems.length === 0) {
    navigate('/cart')
    return null
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
            {t.desc}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-luxury-dark-card rounded-2xl border border-luxury-sand dark:border-luxury-dark-border p-6 lg:p-8 space-y-6">
            <div className="flex items-center gap-2 text-luxury-gold">
              <MapPin size={24} />
              <h2 className="font-serif text-xl font-semibold text-luxury-charcoal dark:text-luxury-cream">
                {t.shippingAddress}
              </h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
                {t.fullName}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t.placeholderName}
                className="w-full px-4 py-3 rounded-lg border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-bg text-luxury-charcoal dark:text-luxury-cream focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
                {t.phoneNumber}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder={t.placeholderPhone}
                className="w-full px-4 py-3 rounded-lg border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-bg text-luxury-charcoal dark:text-luxury-cream focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
                {t.streetAddress}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder={t.placeholderAddress}
                className="w-full px-4 py-3 rounded-lg border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-bg text-luxury-charcoal dark:text-luxury-cream focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
                  {t.governorate}
                </label>
                <input
                  type="text"
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleChange}
                  required
                  placeholder={t.placeholderGov}
                  className="w-full px-4 py-3 rounded-lg border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-bg text-luxury-charcoal dark:text-luxury-cream focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
                  {t.city}
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder={t.placeholderCity}
                  className="w-full px-4 py-3 rounded-lg border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-bg text-luxury-charcoal dark:text-luxury-cream focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
                {t.postalCode}
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder={t.placeholderPostal}
                className="w-full px-4 py-3 rounded-lg border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-bg text-luxury-charcoal dark:text-luxury-cream focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-luxury-dark-card rounded-2xl border border-luxury-sand dark:border-luxury-dark-border p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-luxury-charcoal dark:text-luxury-cream">{t.orderTotal}</span>
              <span className="text-2xl font-bold text-luxury-gold">${cartTotal.toFixed(2)}</span>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-luxury-charcoal dark:bg-luxury-dark-card text-white font-medium rounded-lg hover:bg-luxury-gold transition-colors"
            >
              <CreditCard size={20} />
              {t.placeOrder}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  )
}
