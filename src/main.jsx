import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import { IntroProvider } from './context/IntroContext'
import { LanguageProvider } from './context/LanguageContext'
import { WishlistProvider } from './context/WishlistContext'
import { ReviewsProvider } from './context/ReviewsContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <IntroProvider>
            <CartProvider>
              <WishlistProvider>
                <ReviewsProvider>
                  <App />
                </ReviewsProvider>
              </WishlistProvider>
            </CartProvider>
          </IntroProvider>
        </LanguageProvider>
      </ThemeProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#2C2C2C',
            color: '#F5F0E8',
            borderRadius: '12px',
            border: '1px solid #C9A962',
          },
          success: {
            iconTheme: {
              primary: '#C9A962',
              secondary: '#2C2C2C',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
