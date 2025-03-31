import { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import PurchaseModal from './PurchaseModal';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Елегантна сумка-клатч "Вечірня Зірка"',
    price: 899,
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Вишукана сумка-клатч для особливих подій',
    material: 'Еко-шкіра преміум класу',
    dimensions: { width: 25, height: 15, depth: 5 }
  },
  {
    id: '2',
    name: 'Сумка крос-боді "Міський Шик"',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Стильна сумка на кожен день з регульованим ременем',
    material: 'Натуральна шкіра',
    dimensions: { width: 30, height: 20, depth: 10 }
  },
  {
    id: '3',
    name: 'Сумка-шоппер "Практична Елегантність"',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Містка сумка для шопінгу та повсякденного використання',
    material: 'Комбінована шкіра',
    dimensions: { width: 35, height: 30, depth: 12 }
  },
  {
    id: '4',
    name: 'Міні-сумка "Весняний Настрій"',
    price: 799,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Компактна сумка для важливих дрібниць',
    material: 'Еко-шкіра',
    dimensions: { width: 20, height: 15, depth: 8 }
  },
  {
    id: '5',
    name: 'Сумка-рюкзак "Трансформер"',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Універсальна сумка-рюкзак з можливістю трансформації',
    material: 'Натуральна шкіра преміум класу',
    dimensions: { width: 28, height: 35, depth: 15 }
  },
  {
    id: '6',
    name: 'Класична сумка "Бізнес Леді"',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Елегантна сумка для ділових зустрічей',
    material: 'Натуральна шкіра',
    dimensions: { width: 40, height: 30, depth: 15 }
  },
  {
    id: '7',
    name: 'Сумка-мішок "Богемний Шик"',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Стильна сумка вільного крою',
    material: 'Замша',
    dimensions: { width: 35, height: 40, depth: 15 }
  },
  {
    id: '8',
    name: 'Сумка-портфель "Офісний Стиль"',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Містка сумка для документів та ноутбука',
    material: 'Натуральна шкіра',
    dimensions: { width: 40, height: 30, depth: 10 }
  }
];

export default function ProductGrid({ priceRange, searchQuery }: { priceRange: [number, number], searchQuery: string }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPrice && matchesSearch;
    });
  }, [priceRange, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onBuyClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>
      
      {selectedProduct && (
        <PurchaseModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}