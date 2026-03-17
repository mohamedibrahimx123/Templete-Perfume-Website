import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const cartItemKey = (item) => `${item.id}-${item.size || '100ml'}`

  const addToCart = (product, quantity = 1, size = '100ml') => {
    const sizeOption = product.sizes?.find((s) => s.size === size) || { size: '100ml', price: product.price }
    const price = sizeOption.price
    const cartProduct = { ...product, size: sizeOption.size, price, quantity }
    setCartItems((prev) => {
      const key = cartItemKey(cartProduct)
      const existing = prev.find((item) => cartItemKey(item) === key)
      if (existing) {
        return prev.map((item) =>
          cartItemKey(item) === key ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { ...cartProduct, quantity }]
    })
  }

  const removeFromCart = (productId, size = '100ml') => {
    setCartItems((prev) => prev.filter((item) => !(item.id === productId && (item.size || '100ml') === size)))
  }

  const updateQuantity = (productId, quantity, size = '100ml') => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && (item.size || '100ml') === size ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
