import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../lib/i18n'

export default function Breadcrumbs({ productName }) {
  const location = useLocation()
  const { lang } = useLanguage()
  const t = translations[lang].breadcrumbs
  const pathnames = location.pathname.split('/').filter(Boolean)

  const getLabel = (name, isLast) => {
    if (isLast && productName) return productName
    const map = {
      products: t.products,
      product: t.product,
      cart: t.cart,
      checkout: t.checkout,
      support: t.support,
      wishlist: t.wishlist,
    }
    return map[name] || (name && !/^\d+$/.test(name) ? name.charAt(0).toUpperCase() + name.slice(1) : t.product)
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-luxury-charcoal/70 dark:text-luxury-dark-muted mb-6">
      <Link to="/" className="hover:text-luxury-gold transition-colors">
        {t.home}
      </Link>
      {pathnames.map((name, i) => {
        const path = `/${pathnames.slice(0, i + 1).join('/')}`
        const isLast = i === pathnames.length - 1
        const label = getLabel(name, isLast)

        return (
          <span key={path} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-luxury-charcoal/50" />
            {isLast ? (
              <span className="text-luxury-charcoal dark:text-luxury-cream font-medium">
                {label}
              </span>
            ) : (
              <Link to={path} className="hover:text-luxury-gold transition-colors">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
