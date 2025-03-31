import { Search, ShoppingBag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../types';

interface HeaderProps {
  onPriceRangeChange: (range: [number, number]) => void;
  onSearchChange: (query: string) => void;
}

export default function Header({ onPriceRangeChange, onSearchChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePriceChange = (value: number) => {
    const newRange: [number, number] = [0, value];
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
    setShowSuggestions(value.length > 0);
  };

  return (
    <header className="sticky top-0 z-50 bg-cream-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://i.postimg.cc/NGHkKzDw/aca3393f-b785-413c-8d5b-5263dfdeaf16.jpg"
              alt="TrendyMood"
              className="h-[100px] w-[150px] object-contain"
            />
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link to="/" className="text-gray-700 hover:text-pink-600">Головна</Link></li>
              <li><Link to="/contacts" className="text-gray-700 hover:text-pink-600">Контакти</Link></li>
              <li><Link to="/shipping" className="text-gray-700 hover:text-pink-600">Доставка та оплата</Link></li>
            </ul>
          </nav>
        </div>
        
        {isHomePage && (
          <div className="flex flex-col md:flex-row items-center gap-4 py-4">
            <div className="relative flex-1" ref={searchRef}>
              <input
                type="text"
                placeholder="Пошук товарів"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Ціна до:</span>
              <input
                type="range"
                min="0"
                max="3000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(parseInt(e.target.value))}
                className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-700">{priceRange[1]} ₴</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}