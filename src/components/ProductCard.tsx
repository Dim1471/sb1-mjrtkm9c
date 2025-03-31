import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onBuyClick: () => void;
}

export default function ProductCard({ product, onBuyClick }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-pink-600">{product.price} ₴</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                onBuyClick();
              }}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Купити
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}