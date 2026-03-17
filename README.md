# Luxury Perfume E-Commerce Demo

A modern perfume e-commerce store demo built with React, Vite, Tailwind CSS, Framer Motion, and React Hot Toast.

## Tech Stack

- **React** + **Vite**
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **Lucide Icons** - Icons
- **React Router** - Navigation

## Project Structure

```
src/
├── app/                 # Pages
│   ├── HomePage.jsx
│   ├── products/ProductsPage.jsx
│   ├── admin/AdminPage.jsx
│   └── support/SupportPage.jsx
├── components/
│   ├── ui/              # Reusable UI components
│   │   └── QuantitySelector.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── HeroSection.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── BrandShowcase.jsx
│   └── ContactForm.jsx
├── data/
│   └── perfumes.js      # Demo product data
├── hooks/
├── lib/
├── styles/
└── index.css
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## Features

- **Home Page** - Hero section, featured perfumes, brand showcase
- **Products Page** - Responsive product grid with add to cart
- **Admin Demo** - Product editing interface (frontend only)
- **Support Page** - Contact form with toast confirmation

## Design

- Clean, premium aesthetic inspired by luxury brands
- Smooth Framer Motion animations
- Fully responsive layout
- Gold accent color (#C9A962) with cream/charcoal palette
