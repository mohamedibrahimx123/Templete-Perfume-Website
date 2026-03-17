import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SplashIntro from './components/SplashIntro'
import PromoBanner from './components/PromoBanner'
import ScrollToTop from './components/ui/ScrollToTop'
import HomePage from './app/HomePage'
import ProductsPage from './app/products/ProductsPage'
import ProductDetailPage from './app/products/ProductDetailPage'
import CartPage from './app/cart/CartPage'
import CheckoutPage from './app/checkout/CheckoutPage'
import SupportPage from './app/support/SupportPage'
import WishlistPage from './app/wishlist/WishlistPage'

function App() {
  return (
    <LayoutGroup>
      <div className="min-h-screen flex flex-col">
        <SplashIntro />
        <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </AnimatePresence>
      </main>
        <Footer />
        <ScrollToTop />
      </div>
    </LayoutGroup>
  )
}

export default App
