import { motion } from 'framer-motion'

export default function SizeSelector({ sizes, selected, onChange }) {
  if (!sizes?.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map(({ size, price }) => (
        <motion.button
          key={size}
          type="button"
          onClick={() => onChange(size)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
            selected === size
              ? 'bg-luxury-gold/20 border-luxury-gold text-luxury-charcoal dark:text-luxury-cream'
              : 'border-luxury-sand dark:border-luxury-dark-border hover:border-luxury-gold/50 text-luxury-charcoal dark:text-luxury-cream'
          }`}
        >
          {size} - ${price.toFixed(2)}
        </motion.button>
      ))}
    </div>
  )
}
