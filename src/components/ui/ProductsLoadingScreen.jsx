import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'

export default function ProductsLoadingScreen() {
  const { lang } = useLanguage()
  const t = translations[lang].common
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-luxury-cream dark:bg-luxury-dark-bg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-cream via-white to-luxury-sand/50 dark:from-luxury-dark-bg dark:via-luxury-dark-card/50 dark:to-luxury-dark-bg" />
      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          <div className="w-20 h-24 rounded-lg bg-gradient-to-b from-luxury-gold/20 to-luxury-gold/5 dark:from-luxury-gold/30 dark:to-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-luxury-gold" strokeWidth={1.5} />
          </div>
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-luxury-gold/40"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.div>

        <div className="flex flex-col items-center gap-3">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-xl text-luxury-charcoal dark:text-luxury-cream"
          >
            {t.loadingFragrances}
          </motion.p>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-luxury-gold"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="h-1 w-48 rounded-full bg-luxury-sand dark:bg-luxury-dark-border overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-luxury-gold to-luxury-gold/70 rounded-full"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ width: '40%' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
