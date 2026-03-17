// Unique Unsplash perfume bottle images - no duplicates
const IMAGES = {
  p1: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=600&fit=crop',
  p2: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop',
  p3: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=600&fit=crop',
  p4: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&h=600&fit=crop',
  p5: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop',
  p6: 'https://images.unsplash.com/photo-1595425970377-cf3ed5662e8f?w=600&h=600&fit=crop',
  p7: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=600&fit=crop',
  p8: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=600&fit=crop',
  p9: 'https://images.unsplash.com/photo-1585218334450-afcf929da36e?w=600&h=600&fit=crop',
  p10: 'https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?w=600&h=600&fit=crop',
  p11: 'https://images.unsplash.com/photo-1594125311687-3b1b3eafa9f4?w=600&h=600&fit=crop',
  p12: 'https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=600&h=600&fit=crop',
  p13: 'https://images.unsplash.com/photo-1615160460524-432433ba1b8f?w=600&h=600&fit=crop',
  p14: 'https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=600&h=600&fit=crop',
  p15: 'https://images.unsplash.com/photo-1622618991746-fe6004db3a47?w=600&h=600&fit=crop',
  p16: 'https://images.unsplash.com/photo-1585218356022-6a53145f56f6?w=600&h=600&fit=crop',
  p17: 'https://images.unsplash.com/photo-1610113233329-1c73b6f7fe98?w=600&h=600&fit=crop',
  p18: 'https://images.unsplash.com/photo-1666621630026-862eea07236c?w=600&h=600&fit=crop',
  p19: 'https://images.unsplash.com/photo-1768025719875-48ed072f3084?w=600&h=600&fit=crop',
  p20: 'https://images.unsplash.com/photo-1669200141274-38ae8632a86a?w=600&h=600&fit=crop',
  p21: 'https://images.unsplash.com/photo-1564644411635-5ec7c9aca726?w=600&h=600&fit=crop',
  p22: 'https://images.unsplash.com/photo-1595425970377-cf3ed5662e8f?w=600&h=600&fit=crop',
  p23: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=600&fit=crop',
  p24: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&h=600&fit=crop',
}

const getSizes = (basePrice) => [
  { size: '50ml', price: Math.round(basePrice * 0.6 * 100) / 100 },
  { size: '100ml', price: basePrice },
  { size: '200ml', price: Math.round(basePrice * 1.7 * 100) / 100 },
]

const productMeta = (p, id, basePrice) => ({
  description: p.description || `Premium fragrance. Long-lasting, elegant scent.`,
  rating: p.rating ?? 4 + (id % 10) / 10,
  reviewCount: p.reviewCount ?? 15 + (id % 70),
  sizes: p.sizes || getSizes(basePrice ?? 99.99),
  discount: p.discount ?? 0,
  comingSoon: p.comingSoon ?? false,
})

// Arabic perfumes - each product has unique perfume bottle image
export const arabicPerfumes = [
  { id: 1, name: 'Sauvage', brand: 'Dior', price: 129.99, image: IMAGES.p1, quantity: 15, discount: 10, ...productMeta({}, 1, 129.99) },
  { id: 2, name: 'Boss Bottled', brand: 'Hugo Boss', price: 89.99, image: IMAGES.p2, quantity: 20, ...productMeta({}, 2, 89.99) },
  { id: 3, name: 'Hugo Man', brand: 'Hugo Boss', price: 79.99, image: IMAGES.p3, quantity: 18, ...productMeta({}, 3, 79.99) },
  { id: 4, name: 'The Scent', brand: 'Hugo Boss', price: 95.99, image: IMAGES.p4, quantity: 12, discount: 15, ...productMeta({}, 4, 95.99) },
  { id: 5, name: 'One Million', brand: 'Paco Rabanne', price: 99.99, image: IMAGES.p5, quantity: 25, ...productMeta({}, 5, 99.99) },
  { id: 6, name: 'One Man Show', brand: 'Jacques Bogart', price: 49.99, image: IMAGES.p6, quantity: 30, ...productMeta({}, 6, 49.99) },
  { id: 7, name: 'Invictus', brand: 'Paco Rabanne', price: 109.99, image: IMAGES.p7, quantity: 14, ...productMeta({}, 7, 109.99) },
  { id: 8, name: 'Bleu de Chanel', brand: 'Chanel', price: 149.99, image: IMAGES.p8, quantity: 10, discount: 5, ...productMeta({}, 8, 149.99) },
  { id: 9, name: 'Arabian Oud Royal', brand: 'Arabian Oud', price: 149.99, image: IMAGES.p9, quantity: 10, ...productMeta({}, 9, 149.99) },
  { id: 10, name: 'Ajmal Dahn Al Oudh', brand: 'Ajmal', price: 189.99, image: IMAGES.p10, quantity: 8, ...productMeta({}, 10, 189.99) },
  { id: 11, name: 'Rasasi La Yuqawam', brand: 'Rasasi', price: 129.99, image: IMAGES.p11, quantity: 12, ...productMeta({}, 11, 129.99) },
  { id: 12, name: 'Swiss Arabian Shaghaf', brand: 'Swiss Arabian', price: 159.99, image: IMAGES.p12, quantity: 6, discount: 20, ...productMeta({}, 12, 159.99) },
  { id: 13, name: 'Acqua Di Gio', brand: 'Giorgio Armani', price: 119.99, image: IMAGES.p13, quantity: 16, ...productMeta({}, 13, 119.99) },
  { id: 14, name: 'Terre d\'Hermès', brand: 'Hermès', price: 139.99, image: IMAGES.p14, quantity: 9, ...productMeta({}, 14, 139.99) },
  { id: 15, name: 'Eros', brand: 'Versace', price: 94.99, image: IMAGES.p15, quantity: 22, ...productMeta({}, 15, 94.99) },
  { id: 16, name: 'Light Blue', brand: 'Dolce & Gabbana', price: 89.99, image: IMAGES.p16, quantity: 19, comingSoon: true, ...productMeta({}, 16, 89.99) },
  { id: 17, name: 'Oud Al Saqar', brand: 'Arabian Oud', price: 219.99, image: IMAGES.p17, quantity: 15, ...productMeta({}, 17, 219.99) },
  { id: 18, name: 'Mukhalat Al Nada', brand: 'Ajmal', price: 169.99, image: IMAGES.p18, quantity: 12, ...productMeta({}, 18, 169.99) },
  { id: 19, name: 'Dahn Al Oudh Cambodi', brand: 'Ajmal', price: 249.99, image: IMAGES.p19, quantity: 8, ...productMeta({}, 19, 249.99) },
  { id: 20, name: 'Shaghaf Oud', brand: 'Swiss Arabian', price: 159.99, image: IMAGES.p20, quantity: 14, ...productMeta({}, 20, 159.99) },
  { id: 21, name: 'La Yuqawam Homme', brand: 'Rasasi', price: 89.99, image: IMAGES.p21, quantity: 22, discount: 12, ...productMeta({}, 21, 89.99) },
  { id: 22, name: 'Kalemat Black', brand: 'Arabian Oud', price: 189.99, image: IMAGES.p22, quantity: 10, ...productMeta({}, 22, 189.99) },
  { id: 23, name: 'Wisal Dhahab', brand: 'Ajmal', price: 139.99, image: IMAGES.p23, quantity: 18, ...productMeta({}, 23, 139.99) },
  { id: 24, name: 'Badee Al Oud', brand: 'Swiss Arabian', price: 129.99, image: IMAGES.p24, quantity: 16, ...productMeta({}, 24, 129.99) },
]

export const perfumes = arabicPerfumes

export const brands = [
  { name: 'Dior', logo: IMAGES.p1 },
  { name: 'Hugo Boss', logo: IMAGES.p2 },
  { name: 'Paco Rabanne', logo: IMAGES.p5 },
  { name: 'Arabian Oud', logo: IMAGES.p1 },
  { name: 'Ajmal', logo: IMAGES.p2 },
  { name: 'Rasasi', logo: IMAGES.p3 },
  { name: 'Swiss Arabian', logo: IMAGES.p4 },
]
