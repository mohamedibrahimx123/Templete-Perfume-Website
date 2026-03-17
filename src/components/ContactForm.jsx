import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../lib/i18n'

export default function ContactForm() {
  const { lang } = useLanguage()
  const t = translations[lang].contact
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success(t.successMessage)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
          {t.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-cream focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none transition-all placeholder:text-luxury-dark-muted"
          placeholder={t.placeholderName}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
          {t.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-cream focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none transition-all placeholder:text-luxury-dark-muted"
          placeholder={t.placeholderEmail}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-luxury-charcoal dark:text-luxury-cream mb-2">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-luxury-sand dark:border-luxury-dark-border bg-white dark:bg-luxury-dark-card text-luxury-charcoal dark:text-luxury-cream focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none transition-all resize-none placeholder:text-luxury-dark-muted"
          placeholder={t.placeholderMessage}
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-luxury-charcoal dark:bg-luxury-dark-card text-white font-medium rounded-lg hover:bg-luxury-gold transition-colors border border-luxury-dark-border"
      >
        <Send size={20} />
        {t.submit}
      </motion.button>
    </motion.form>
  )
}
