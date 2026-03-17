import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import toast from 'react-hot-toast'
import { perfumes } from '../../data/perfumes'

export default function AdminPage() {
  const [product, setProduct] = useState({
    id: perfumes[0].id,
    image: perfumes[0].image,
    name: perfumes[0].name,
    price: perfumes[0].price.toString(),
    quantity: perfumes[0].quantity.toString(),
  })

  const handleProductSelect = (e) => {
    const selected = perfumes.find((p) => p.id === Number(e.target.value))
    if (selected) {
      setProduct({
        id: selected.id,
        image: selected.image,
        name: selected.name,
        price: selected.price.toString(),
        quantity: selected.quantity.toString(),
      })
    }
  }

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    toast.success('Product updated successfully. (Demo - no backend)')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="py-12 lg:py-16"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-luxury-charcoal">
            Admin Demo
          </h1>
          <p className="mt-2 text-luxury-charcoal/70">
            Edit product details (frontend demo only)
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSave}
          className="bg-white rounded-2xl shadow-sm border border-luxury-sand overflow-hidden"
        >
          <div className="p-6 lg:p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-luxury-charcoal mb-2">
                Select Product
              </label>
              <select
                value={product.id}
                onChange={handleProductSelect}
                className="w-full px-4 py-3 rounded-lg border border-luxury-sand focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none"
              >
                {perfumes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-luxury-charcoal mb-2">
                Product Image URL
              </label>
              <input
                type="url"
                name="image"
                value={product.image}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-luxury-sand focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none"
              />
              <div className="mt-2 aspect-square max-w-[120px] rounded-lg overflow-hidden bg-luxury-cream">
                <img
                  src={product.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/120')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-luxury-charcoal mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-luxury-sand focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-luxury-charcoal mb-2">
                  Product Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-lg border border-luxury-sand focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-luxury-charcoal mb-2">
                  Product Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-luxury-sand focus:ring-2 focus:ring-luxury-gold focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div className="px-6 lg:px-8 pb-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-luxury-charcoal text-white font-medium rounded-lg hover:bg-luxury-gold transition-colors"
            >
              <Save size={20} />
              Save Changes
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  )
}
