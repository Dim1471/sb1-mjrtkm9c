import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contacts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Контакти</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div className="flex items-center space-x-4">
            <Phone className="h-6 w-6 text-pink-600" />
            <div>
              <h2 className="font-semibold">Телефон:</h2>
              <a href="tel:066-666-04-01" className="text-2xl text-gray-700">066-666-04-01</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Mail className="h-6 w-6 text-pink-600" />
            <div>
              <h2 className="font-semibold">Email:</h2>
              <a href="mailto:info@trendymood.ua" className="text-gray-700">info@trendymood.ua</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Clock className="h-6 w-6 text-pink-600" />
            <div>
              <h2 className="font-semibold">Графік роботи:</h2>
              <p className="text-gray-700">Пн-Пт: 9:00 - 18:00</p>
              <p className="text-gray-700">Сб-Нд: 10:00 - 16:00</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <MapPin className="h-6 w-6 text-pink-600" />
            <div>
              <h2 className="font-semibold">Адреса:</h2>
              <p className="text-gray-700">м. Київ, вул. Хрещатик, 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}