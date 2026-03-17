import { motion } from 'framer-motion'
import { perfumes } from '../data/perfumes'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../lib/i18n'

const brands = [...new Set(perfumes.map((p) => p.brand))]

export default function BrandShowcase() {
  const { lang } = useLanguage()
  const t = translations[lang].brands
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-luxury-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-luxury-charcoal dark:text-luxury-cream">
            {t.title}
          </h2>
          <p className="mt-4 text-luxury-charcoal/70 dark:text-luxury-dark-muted max-w-2xl mx-auto">
            {t.desc}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {brands.map((brand, index) => {
            const product = perfumes.find((p) => p.brand === brand)
            return (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-luxury-cream dark:bg-luxury-dark-card border border-luxury-sand dark:border-luxury-dark-border">
                  <img
                    src={product?.image}
                    alt={brand}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=200&h=150&fit=crop' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="mt-3 font-serif font-semibold text-luxury-charcoal dark:text-luxury-cream text-center group-hover:text-luxury-gold transition-colors">
                  {brand}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
