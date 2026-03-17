import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, Sparkles, Instagram, Facebook, Twitter } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'

export default function Footer() {
  const { lang } = useLanguage()
  const t = translations[lang]

  const quickLinks = [
    { path: '/', label: t.nav.home },
    { path: '/products', label: t.nav.products },
    { path: '/support', label: t.nav.support },
  ]

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  return (
    <footer className="relative bg-luxury-charcoal dark:bg-luxury-dark-bg text-luxury-cream mt-auto overflow-hidden">
      {/* Top gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent origin-left"
      />

      {/* Subtle shimmer background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-luxury-gold to-transparent"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-5"
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="p-2 rounded-lg bg-luxury-gold/10 border border-luxury-gold/20">
                <Sparkles className="w-5 h-5 text-luxury-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-luxury-gold">Perfume</h3>
            </motion.div>
            <p className="text-luxury-sand/80 text-sm leading-relaxed max-w-md">
              {t.footer.tagline}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group p-2.5 rounded-full bg-white/5 hover:bg-luxury-gold/20 border border-white/10 hover:border-luxury-gold/40 transition-colors"
                >
                  <Icon size={18} className="text-luxury-sand/80 group-hover:text-luxury-gold transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <h4 className="font-semibold text-luxury-gold uppercase tracking-wider text-sm">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ path, label }, i) => (
                <motion.li
                  key={path}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                >
                  <Link
                    to={path}
                    className="group inline-flex items-center gap-2 text-luxury-sand/80 hover:text-luxury-gold text-sm transition-colors"
                  >
                    <motion.span
                      className="w-1 h-1 rounded-full bg-luxury-gold/50 group-hover:bg-luxury-gold"
                      whileHover={{ scale: 1.5, x: 4 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    />
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <h4 className="font-semibold text-luxury-gold uppercase tracking-wider text-sm">{t.footer.contact}</h4>
            <div className="space-y-3 text-sm">
              <motion.a
                href="mailto:support@perfume.com"
                className="flex items-center gap-3 text-luxury-sand/80 hover:text-luxury-gold transition-colors group"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <motion.span
                  className="p-2 rounded-lg bg-white/5 group-hover:bg-luxury-gold/10"
                  whileHover={{ rotate: 12 }}
                >
                  <Mail size={16} />
                </motion.span>
                support@perfume.com
              </motion.a>
              <motion.a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-luxury-sand/80 hover:text-luxury-gold transition-colors group"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <motion.span
                  className="p-2 rounded-lg bg-white/5 group-hover:bg-luxury-gold/10"
                  whileHover={{ rotate: -12 }}
                >
                  <Phone size={16} />
                </motion.span>
                +1 234 567 890
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-luxury-sand/60">
            © {new Date().getFullYear()} Perfume. {t.footer.rights}
          </p>
          <motion.div
            className="flex items-center gap-1.5 text-luxury-sand/50 text-xs"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles size={12} />
            <span>{t.footer.premium}</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
