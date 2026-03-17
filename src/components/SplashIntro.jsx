import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntro } from '../context/IntroContext'

const LOGO_IMAGE = 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop'

export default function SplashIntro() {
  const { introDone, completeIntro, shouldShowIntro } = useIntro()
  const location = useLocation()
  const show = !introDone && shouldShowIntro(location.pathname)

  useEffect(() => {
    if (!show) return
    const timer = setTimeout(completeIntro, 4000)
    return () => clearTimeout(timer)
  }, [show, completeIntro])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-luxury-cream dark:bg-luxury-dark-bg overflow-hidden"
        >
          {/* Pulsing glow background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[600px] h-[600px] rounded-full bg-luxury-gold/30 blur-3xl"
            />
          </motion.div>

          {/* One Man Show - BIG with crazy movement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, 25, -30, 20, -25, 15, -20, 0],
              y: [0, -20, 30, -25, 20, -30, 25, 0],
              rotate: [0, 5, -8, 6, -5, 4, -3, 0],
            }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              x: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative z-10 w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem]"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(201, 169, 98, 0)',
                  '0 0 80px 30px rgba(201, 169, 98, 0.4)',
                  '0 0 120px 40px rgba(201, 169, 98, 0.2)',
                  '0 0 80px 30px rgba(201, 169, 98, 0.4)',
                  '0 0 0 0 rgba(201, 169, 98, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full rounded-2xl overflow-hidden border-4 border-luxury-gold/40 bg-white dark:bg-luxury-dark-card shadow-2xl"
            >
              <img
                src={LOGO_IMAGE}
                alt="Perfume"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </motion.div>

          {/* One Man Show text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              x: [0, 8, -6, 5, -4, 0],
            }}
            transition={{
              opacity: { delay: 0.6, duration: 0.5 },
              y: { delay: 0.6, duration: 0.5 },
              x: { delay: 1.2, duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute bottom-16 font-serif text-3xl sm:text-4xl font-bold text-luxury-charcoal dark:text-luxury-cream"
          >
            Perfume
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
