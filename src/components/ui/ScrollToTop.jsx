import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'

export default function ScrollToTop() {
  const { lang } = useLanguage()
  const ariaLabel = translations[lang].common.scrollToTop
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-luxury-charcoal dark:bg-luxury-dark-card text-luxury-cream border border-luxury-gold/30 shadow-lg hover:bg-luxury-gold hover:text-luxury-charcoal transition-colors"
          aria-label={ariaLabel}
        >
          <ArrowUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
