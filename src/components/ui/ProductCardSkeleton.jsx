import { motion } from 'framer-motion'

export default function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-luxury-dark-card border border-luxury-sand/50 dark:border-luxury-dark-border">
      <div className="aspect-[4/5] bg-luxury-sand/30 dark:bg-luxury-dark-border/50 animate-pulse" />
      <div className="p-5 space-y-4">
        <div className="h-3 w-1/3 bg-luxury-sand/40 dark:bg-luxury-dark-border rounded" />
        <div className="h-5 w-2/3 bg-luxury-sand/40 dark:bg-luxury-dark-border rounded" />
        <div className="h-6 w-1/4 bg-luxury-sand/40 dark:bg-luxury-dark-border rounded" />
        <div className="h-10 w-full bg-luxury-sand/40 dark:bg-luxury-dark-border rounded-xl" />
      </div>
    </div>
  )
}
