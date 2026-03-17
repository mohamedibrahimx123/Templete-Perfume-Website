import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Heart, Languages } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'
import { useWishlist } from '../../context/WishlistContext'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'

export default function Navbar() {
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang } = useLanguage()
  const t = translations[lang].nav
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: t.home },
    { path: '/products', label: t.products },
    { path: '/cart', label: t.cart, count: cartCount },
    { path: '/wishlist', label: t.wishlist, count: wishlistCount },
    { path: '/support', label: t.support },
  ]

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/95 dark:bg-luxury-dark-bg/95 backdrop-blur-sm border-b border-luxury-sand dark:border-luxury-dark-border"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="font-serif text-2xl lg:text-3xl font-semibold text-luxury-charcoal dark:text-luxury-cream hover:text-luxury-gold transition-colors">
            Perfume
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors flex items-center gap-1 ${
                  location.pathname === link.path || (link.path === '/products' && location.pathname.startsWith('/products/'))
                    ? 'text-luxury-gold'
                    : 'text-luxury-charcoal dark:text-luxury-cream hover:text-luxury-gold'
                }`}
              >
                {link.path === '/wishlist' && <Heart size={18} />}
                {link.label}
                {link.count != null && link.count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-luxury-gold text-luxury-charcoal text-xs font-semibold"
                  >
                    {link.count}
                  </motion.span>
                )}
              </Link>
            ))}
            <motion.button
              onClick={toggleLang}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-luxury-cream dark:bg-luxury-dark-card border border-luxury-sand dark:border-luxury-dark-border text-luxury-charcoal dark:text-luxury-gold transition-colors"
              aria-label="Toggle language"
              title={lang === 'en' ? 'العربية' : 'English'}
            >
              <Languages size={20} />
            </motion.button>
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-luxury-cream dark:bg-luxury-dark-card border border-luxury-sand dark:border-luxury-dark-border text-luxury-charcoal dark:text-luxury-gold transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-luxury-cream dark:hover:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-cream"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-luxury-sand dark:border-luxury-dark-border"
            >
              <div className="py-4 flex flex-col gap-2">
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm font-medium text-luxury-charcoal dark:text-luxury-cream">{t.language}</span>
                  <motion.button
                    onClick={toggleLang}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-luxury-cream dark:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-gold"
                  >
                    <Languages size={20} />
                  </motion.button>
                </div>
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm font-medium text-luxury-charcoal dark:text-luxury-cream">{t.theme}</span>
                  <motion.button
                    onClick={toggleTheme}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-luxury-cream dark:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-gold"
                  >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  </motion.button>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center justify-between ${
                      location.pathname === link.path
                        ? 'bg-luxury-gold/10 text-luxury-gold'
                        : 'hover:bg-luxury-cream dark:hover:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-cream'
                    }`}
                  >
                    {link.path === '/wishlist' && <Heart size={18} className="mr-2" />}
                    {link.label}
                    {link.count != null && link.count > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-luxury-gold text-white text-xs font-semibold">
                        {link.count}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
