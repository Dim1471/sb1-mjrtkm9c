import { GitBranch as BrandTelegram, Instagram, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cream-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex justify-center space-x-6">
            <a
              href="https://t.me/trendymood"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              <BrandTelegram className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com/trendymood"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>
          
          <a href="tel:066-666-04-01" className="flex items-center space-x-2 text-2xl text-gray-700">
            <Phone className="h-6 w-6" />
            <span>066-666-04-01</span>
          </a>
          
          <p className="text-center text-gray-700 mt-4">
            © 2024 TrendyMood. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}