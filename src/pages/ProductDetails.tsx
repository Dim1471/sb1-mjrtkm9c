import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';

export default function ProductDetails() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // This would typically come from an API or props
  const product = {
    id: 'POMB6',
    name: 'Сумка клатч жіноча на плече "РОМБ" (2 кольори)',
    price: 319,
    image: 'https://i.postimg.cc/NGHkKzDw/aca3393f-b785-413c-8d5b-5263dfdeaf16.jpg',
    description: 'Стильна міська жіноча сумочка у повсякденному стилі. Поєднання стилю та зручності. Одне внутрішнє відділення. Закривається на молнію.',
    material: 'Еко-шкіра',
    colors: ['Кремовий', 'Чорний'],
    origin: 'Китай',
    code: 'POMB6'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = Math.floor(Math.random() * 10000);
    
    // In a real application, this would be handled by a backend service
    console.log('Order submitted:', {
      orderNumber,
      ...formData,
      product: product.name,
      price: product.price
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="space-y-4 mb-8">
              <p className="text-lg">
                <span className="font-semibold">Ціна:</span> {product.price} грн
              </p>
              <p>
                <span className="font-semibold">Матеріал:</span> {product.material}
              </p>
              <p>
                <span className="font-semibold">Країна виробник:</span> {product.origin}
              </p>
              <p>
                <span className="font-semibold">Код товару:</span> {product.code}
              </p>
              
              <div>
                <span className="font-semibold block mb-2">Колір:</span>
                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <label key={color} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        className="form-radio text-pink-600"
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ваше ім'я"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <input
                type="email"
                placeholder="Ваша електронна пошта"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <input
                type="tel"
                placeholder="Ваш телефон"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <input
                type="text"
                placeholder="Адреса доставки"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors"
              >
                Підтвердити замовлення
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}