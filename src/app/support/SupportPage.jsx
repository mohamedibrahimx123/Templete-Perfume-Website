import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone } from 'lucide-react'
import ContactForm from '../../components/ContactForm'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'

export default function SupportPage() {
  const { lang } = useLanguage()
  const t = translations[lang].support

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="py-12 lg:py-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-luxury-gold/10 dark:bg-luxury-gold/20 text-luxury-gold mb-4">
            <MessageCircle size={32} />
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-luxury-charcoal dark:text-luxury-cream">
            {t.title}
          </h1>
          <p className="mt-4 text-luxury-charcoal/70 dark:text-luxury-dark-muted max-w-xl mx-auto">
            {t.desc}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-luxury-dark-card border border-luxury-sand dark:border-luxury-dark-border"
          >
            <Mail className="text-luxury-gold mb-2" size={28} />
            <h3 className="font-semibold text-luxury-charcoal dark:text-luxury-cream">{t.email}</h3>
            <a href="mailto:support@perfume.com" className="text-sm text-luxury-charcoal/70 dark:text-luxury-dark-muted hover:text-luxury-gold mt-1">
              support@perfume.com
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-luxury-dark-card border border-luxury-sand dark:border-luxury-dark-border"
          >
            <Phone className="text-luxury-gold mb-2" size={28} />
            <h3 className="font-semibold text-luxury-charcoal dark:text-luxury-cream">{t.phone}</h3>
            <a href="tel:+1234567890" className="text-sm text-luxury-charcoal/70 dark:text-luxury-dark-muted hover:text-luxury-gold mt-1">
              +1 234 567 890
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-luxury-dark-card border border-luxury-sand dark:border-luxury-dark-border"
          >
            <MessageCircle className="text-luxury-gold mb-2" size={28} />
            <h3 className="font-semibold text-luxury-charcoal dark:text-luxury-cream">{t.whatsapp}</h3>
            <span className="text-sm text-luxury-charcoal/70 dark:text-luxury-dark-muted mt-1">{t.available247}</span>
          </motion.div>
        </div>

        <div className="bg-white dark:bg-luxury-dark-card rounded-2xl shadow-sm border border-luxury-sand dark:border-luxury-dark-border p-6 lg:p-8">
          <h2 className="font-serif text-xl font-semibold text-luxury-charcoal dark:text-luxury-cream mb-6">{t.sendMessage}</h2>
          <ContactForm />
        </div>
      </div>
    </motion.div>
  )
}
