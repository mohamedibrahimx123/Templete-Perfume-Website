import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../lib/i18n'

export default function HeroSection() {
  const { lang } = useLanguage()
  const t = translations[lang].hero
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-luxury-cream via-white to-luxury-sand dark:from-luxury-dark-bg dark:via-luxury-dark-card dark:to-luxury-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-luxury-charcoal dark:text-luxury-cream leading-tight"
            >
              {t.title1}
              <span className="block text-luxury-gold">{t.title2}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-luxury-charcoal/80 dark:text-luxury-dark-muted max-w-lg"
            >
              {t.desc}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 px-8 py-4 bg-luxury-charcoal dark:bg-luxury-dark-card text-white font-medium rounded-lg hover:bg-luxury-gold transition-colors border-2 border-luxury-charcoal dark:border-luxury-dark-border hover:border-luxury-gold"
                >
                  {t.explore}
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-square max-w-md mx-auto lg:max-w-lg">
              <img
                src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop"
                alt={t.title2}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
