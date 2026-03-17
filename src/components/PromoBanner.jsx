import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../lib/i18n'

export default function PromoBanner() {
  const { lang } = useLanguage()
  const t = translations[lang].common

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-luxury-gold/10 dark:bg-luxury-gold/5 border-b border-luxury-gold/20 py-2"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-luxury-charcoal dark:text-luxury-cream text-sm font-medium">
        <Truck size={18} className="text-luxury-gold" />
        <span>{t.promo}</span>
      </div>
    </motion.div>
  )
}
