import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1)
  }

  const handleIncrement = () => {
    if (value < max) onChange(value + 1)
  }

  return (
    <div className="flex items-center gap-2 border border-luxury-sand dark:border-luxury-dark-border rounded-lg overflow-hidden bg-white dark:bg-luxury-dark-card">
      <motion.button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        whileHover={{ scale: value > min ? 1.05 : 1 }}
        whileTap={{ scale: value > min ? 0.95 : 1 }}
        className="p-2 hover:bg-luxury-cream dark:hover:bg-luxury-dark-bg disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-luxury-charcoal dark:text-luxury-cream"
      >
        <Minus size={16} />
      </motion.button>
      <span className="w-10 text-center font-medium text-sm text-luxury-charcoal dark:text-luxury-cream">{value}</span>
      <motion.button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        whileHover={{ scale: value < max ? 1.05 : 1 }}
        whileTap={{ scale: value < max ? 0.95 : 1 }}
        className="p-2 hover:bg-luxury-cream dark:hover:bg-luxury-dark-bg disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-luxury-charcoal dark:text-luxury-cream"
      >
        <Plus size={16} />
      </motion.button>
    </div>
  )
}
